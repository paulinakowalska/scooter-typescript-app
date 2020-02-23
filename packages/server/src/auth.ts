import express from 'express';
import session from 'express-session';
import passport from 'passport';
import helmet from 'helmet';
import bodyParser from 'body-parser';

const router = express.Router();
const SamlStrategy = require('passport-saml').Strategy;
// eslint-disable-next-line @typescript-eslint/no-var-requires

const ROUTE_LOGIN = '/getUser';
const ROUTE_LOGIN_CALLBACK = '/login/callback';
const ROUTE_LOGOUT = '/logout';
const ROUTE_CHECK_IF_LOGGED_IN = '/check-if-is-logged-in';

function throwOnMissing(name, value) {
    if (!value) {
        throw new Error(`Missing configuration for env.${name}`);
    }
}

function fallbackIfNotInProduction(value) {
    return process.env.NODE_ENV !== 'production' ? value : undefined;
}

// NOTE: Do not replace these with your real credentials. These are for dev only.
// Your real credentials should only be set in Convox/Heroku or wherever your production app lives.
const SAML_CONFIG = {
    entryPoint: fallbackIfNotInProduction(
        'https://vprentapptest.okta.com/app/vporg878211_rentapp_1/exk16mloe97SzUNrr4x6/sso/saml\n',
    ),
    issuer: fallbackIfNotInProduction('http://www.okta.com/exk16mloe97SzUNrr4x6\n'),
    cert: fallbackIfNotInProduction(
        'MIIDqjCCApKgAwIBAgIGAW/7NTwiMA0GCSqGSIb3DQEBCwUAMIGVMQswCQYDVQQGEwJVUzETMBEGA1UECAwKQ2FsaWZvcm5pYTEWMBQGA1UEBwwNU2FuIEZyYW5jaXNjbzENMAsGA1UECgwET2t0YTEUMBIGA1UECwwLU1NPUHJvdmlkZXIxFjAUBgNVBAMMDXZwcmVudGFwcHRlc3QxHDAaBgkqhkiG9w0BCQEWDWluZm9Ab2t0YS5jb20wHhcNMjAwMTMxMTA0NTA3WhcNMzAwMTMxMTA0NjA3WjCBlTELMAkGA1UEBhMCVVMxEzARBgNVBAgMCkNhbGlmb3JuaWExFjAUBgNVBAcMDVNhbiBGcmFuY2lzY28xDTALBgNVBAoMBE9rdGExFDASBgNVBAsMC1NTT1Byb3ZpZGVyMRYwFAYDVQQDDA12cHJlbnRhcHB0ZXN0MRwwGgYJKoZIhvcNAQkBFg1pbmZvQG9rdGEuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4OF/hb5xnASlAgOoIsrgAEnvJrHIxMvgqqAU1Wp2OJvFAgSXqk+9GU/RuRaK/IbbSBu7Wpm4IjO7LD8T58YXgTwngUL4Ye1e/2DBx6EP5WkMNGnWJSCj/aXLnF882rRGyw/jDOUCXgmvaiDEeDs4aCErMOVaSfKv5O1syWwdYrO5LwN5C25wQrIffAlUqh8bYXM9bHeNLikGYQaC/WZvjSYGEQ0B2r1GdC7JhLcxQuzm3YOwDMXV9uQqhB+YLqttBCCSPKYJn4gh33IehvZ1/UCl6tdT4IgKtRBr/bBdxPNIjmOv279VZaflZppKBnPOOAE5u6ETrdvdnPoVoZXI3QIDAQABMA0GCSqGSIb3DQEBCwUAA4IBAQDSaKepdz0M7uYUadmBbKpcg/D3Bdr8XC6QXq1r/eVrQp7ZbYVun1s4X2fT6ObWrutTxPR/q7Uy/NozVfkjTreL8ffSkS2YP/yVkcYtnAsDw56DJjifoYrNzi4rZ8mxIBFwbi5rZ55MGrgViHtGenGt4d02r+uwWSTQnUsdZdebvHJmwI1rrYqvfBVuF2pfOWi0PYsY9ta/omNzlTvwpo9dixBBKraXxzCBuDed9H4M3agmvge9AO6GxKBE58a/8XO9IhDfsLEvU0Y3d/ZlNsWM2/MWQUrKOh3HILVOWOWKueP8KHg0X7bw7ekuuzeYCmaFFlo/T98NSVhYaD5wpsZh',
    ),
};

const COOKIE_SECRET = fallbackIfNotInProduction('dev-secret');
const HOST = (() => {
    const host = fallbackIfNotInProduction('http://localhost:8080/');
    if (host) {
        if (host.endsWith('/')) {
            return host;
        } else {
            throw new Error('env.HOST must end with a /');
        }
    }
})();

throwOnMissing('SAML_ISSUER', SAML_CONFIG.issuer);
throwOnMissing('SAML_ENTRY', SAML_CONFIG.entryPoint);
throwOnMissing('SAML_CERT', SAML_CONFIG.cert);
throwOnMissing('COOKIE_SECRET', COOKIE_SECRET);

const noCache = helmet({
    noCache: true,
});

function authenticationSetup(
    app,
    {
        startRoute = '/',
        loggedOutRoute = '/logged-out',
        cookieName = 'express-saml-template',
        cookieAge = 86400000,
    } = {},
) {
    const users = {};
    const findUser = id => users[id];
    const addUser = user => users && (users[user.nameID] = user);
    const removeUser = user => user && delete users[user.nameID];

    passport.serializeUser(function(user, done) {
        done(null, user.nameID);
    });

    passport.deserializeUser(function(id, done) {
        done(null, findUser(id) || null);
    });

    passport.use(
        new SamlStrategy(
            {
                issuer: SAML_CONFIG.issuer,
                entryPoint: SAML_CONFIG.entryPoint,
                cert: SAML_CONFIG.cert,
                forceAuthn: false,
                path: ROUTE_LOGIN_CALLBACK,
            },
            function(profile, done) {
                if (!profile.nameID) {
                    return done(new Error('Invalid user'), null);
                }

                console.log({ profile, users });

                const user = findUser(profile.nameID);
                if (!user) {
                    addUser(profile);
                    return done(null, profile);
                }
                return done(null, user);
            },
        ),
    );

    function canAccess(req) {
        console.log({ users });
        return req.isAuthenticated();
    }

    passport.loginRequired = function(req, res, next) {
        if (canAccess(req)) {
            console.log({ users, status: 'logged in' });
            return next();
        }
        console.log({ users, status: 'not logged in' });
        if (HOST && req.url) {
            const redirectTarget = HOST + req.url.replace(/^\//, '');
            res.redirect(`${ROUTE_LOGIN}?origin=${encodeURIComponent(redirectTarget)}`);
        } else {
            res.redirect(ROUTE_LOGIN);
        }
    };

    app.use(bodyParser.json());

    app.use(
        session({
            name: cookieName,
            cookie: { maxAge: cookieAge, sameSite: 'lax', secure: process.env.NODE_ENV === 'production' },
            secret: COOKIE_SECRET,
            proxy: true,
            resave: false,
        }),
    );

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(router);

    router.get(ROUTE_LOGOUT, function(req: any, res) {
        // todo types
        removeUser(req.user);
        req.session.destroy();
        res.redirect(loggedOutRoute);
    });

    router.get(
        ROUTE_LOGIN,
        passport.authenticate('saml', {
            failureRedirect: startRoute,
            failureFlash: true,
        }),
    );

    router.get(
        ROUTE_CHECK_IF_LOGGED_IN,
        (req: any, res, next) => {
            console.log({ canAccess: canAccess(req), users, where: 'middleware', session: req.session });
            return next();
        },
        (req, res) => {
            const message = {
                isLoggedIn: false,
                link: '',
            };

            message.link = ROUTE_LOGIN;

            if (canAccess(req)) {
                message.isLoggedIn = true;
            }

            res.statusCode = 200;
            res.json(message);
        },
    );

    router.post(
        ROUTE_LOGIN_CALLBACK,
        bodyParser.urlencoded({ extended: true }),
        passport.authenticate('saml', { successRedirect: '/', failureRedirect: startRoute, failureFlash: true }),
        // (req, res) => {
        //     console.log(req);
        //     res.redirect('http://localhost:8080');
        // },
    );

    return {
        protect: [noCache, passport.protect],
        loginRequired: [noCache, passport.loginRequired],
    };
}

export default authenticationSetup;
