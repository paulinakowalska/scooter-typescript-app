const userData = require('../database/users.json');

class UserController {
    getUsers() {
        return JSON.parse(JSON.stringify(userData));
    }
}

export default UserController;
