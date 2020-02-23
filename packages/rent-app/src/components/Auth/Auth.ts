import { getUser } from '../../api/authentication';

class Auth {
    private authenticated: boolean;
    private isFetching: boolean;
    private user: any; // todo add types

    constructor() {
        this.authenticated = false;
        this.isFetching = false;
        this.user = null;
    }

    async login() {
        if (this.authenticated) {
            return this.authenticated;
        }

        if (this.isFetching) {
            return this.authenticated;
        }

        this.isFetching = true;
        this.user = await getUser();
        this.authenticated = true;
        this.isFetching = false;

        return this.authenticated;
    }

    logout() {
        this.authenticated = false;
        return this.authenticated;
    }

    isAuthenticated() {
        return this.authenticated;
    }

    getUser() {
        return this.user;
        // todo: we can use this data to display logo and name on the page
    }
}

export default new Auth();
