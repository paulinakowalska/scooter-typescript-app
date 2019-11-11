const userData = require('./../views/users.json');

class UserModel {
    private data: string;

    constructor() {
        this.data = JSON.stringify(userData, null, 2);
    }

    get users() {
        return this.data;
    }
}

module.exports = UserModel;
