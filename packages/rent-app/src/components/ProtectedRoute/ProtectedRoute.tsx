import { Route } from 'react-router-dom';
import auth from '../Auth/Auth';
import React, { useEffect, useState } from 'react';

const ProtectedRoute = ({ component: Component, ...otherProps }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        auth.login().then(status => setIsLoggedIn(status));
    }, []);

    return (
        <Route
            {...otherProps}
            render={props => {
                if (isLoggedIn) {
                    return <Component {...props} />;
                } else {
                    return <div> User not authenticated </div>;
                }
            }}
        />
    );
};

export default ProtectedRoute;
