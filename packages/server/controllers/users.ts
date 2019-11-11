import { Request, Response } from 'express';
const UserModel = require('../models/userModel');

module.exports = {
    getUsers: (req: Request, res: Response) => {
        const user = new UserModel();
        const users = user.users;

        res.json(JSON.parse(users));
    },
};
