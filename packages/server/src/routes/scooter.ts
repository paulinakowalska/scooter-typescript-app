import express from 'express';
import { Router, Request, Response } from 'express';

import ScooterController from '../controllers/scooter';
const router: Router = express.Router();

const scootersHandler = (req: Request, res: Response) => {
    const params = req.query;

    const scooterController = new ScooterController();

    let response;
    if (Object.entries(params).length) {
        response = scooterController.getScootersBy(params);
    } else {
        response = scooterController.getScooters();
    }

    res.json(response);
};

router.get('/', scootersHandler);

export default router;
