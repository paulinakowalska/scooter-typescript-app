const userData = require('../database/users.json');

class UserModel {
    private data: string;

    constructor() {
        this.data = JSON.parse(JSON.stringify(userData));
    }

    get users() {
        return this.data;
    }
}

export default UserModel;
