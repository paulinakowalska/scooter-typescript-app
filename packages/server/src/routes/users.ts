import express from 'express';
import { Request, Response, Router } from 'express';

const router: Router = express.Router();
import UserController from '../controllers/users';

const usersHandler = async (req: Request, res: Response) => {
    try {
        const userController = new UserController();

        const response = await userController.getUsers();

        res.json(response);
    } catch (err) {
        res.json({ err });
    }
};

const postUsersHandler = async (req: Request, res: Response) => {
    try {
        const userController = new UserController();

        await userController.insertUsers(req.body.users);

        res.json({ status: 'OK' });
    } catch (err) {
        res.json({ err });
    }
};

const deleteUsersHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const userController = new UserController();

        const response = await userController.deleteUsers(id);

        res.json(response);
    } catch (err) {
        res.json({ err });
    }
};

router.get('/', usersHandler);
router.post('/', postUsersHandler);
router.delete('/:id/', deleteUsersHandler);

export default router;
