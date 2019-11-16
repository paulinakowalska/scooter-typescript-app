import express from 'express';
import { Request, Response, Router } from 'express';

const router: Router = express.Router();
import UserController from '../controllers/users';

const usersHandler = (req: Request, res: Response) => {
    const scooterController = new UserController();

    const response = scooterController.getUsers();

    res.json(response);
};

router.get('/', usersHandler);

export default router;
