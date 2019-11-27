const userData = require('../database/users.json');

type UserModel = {
    id: number;
    name: string;
    scooterId: number;
    startDate: string;
    endDate: string;
};

class UserController {
    getUsers(): Array<UserModel> {
        return JSON.parse(JSON.stringify(userData));
    }
}

export default UserController;
