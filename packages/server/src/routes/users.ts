import express from 'express';
import { Request, Response, Router } from 'express';

import UserController from '../controllers/users';

const router: Router = express.Router();

const usersHandler = async (req: Request, res: Response) => {
    try {
        const userController = new UserController();

        const response = await userController.getUsers();

        res.json(response);
    } catch (err) {
        res.json(err);
    }
};

const postUsersHandler = async (req: Request, res: Response) => {
    try {
        const userController = new UserController();

        await userController.insertUsers(req.body);

        res.json({ status: 'OK' });
    } catch (err) {
        res.json(err);
    }
};

const deleteUsersHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const userController = new UserController();

        await userController.deleteUsers(id);

        res.json({ status: 'OK', message: `Deleted user with id: ${id}` });
    } catch (err) {
        res.json(err);
    }
};

const updateUserHandler = async (req: Request, res: Response) => {
    try {
        const userController = new UserController();

        await userController.updateUser(req.body);

        res.json({ status: 'OK' });
    } catch (err) {
        res.json(err);
    }
};

router.get('/', usersHandler);
router.post('/', postUsersHandler);
router.delete('/:id/', deleteUsersHandler);
router.patch('/', updateUserHandler);
router.put('/', updateUserHandler);

export default router;
