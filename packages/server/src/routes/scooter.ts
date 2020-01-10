import express from 'express';
import { Router, Request, Response } from 'express';

import ScooterController from '../controllers/scooter';

const router: Router = express.Router();

const scootersHandler = async (req: Request, res: Response) => {
    const params = req.query;

    try {
        const scooterController = new ScooterController();

        let response;
        if (Object.entries(params).length) {
            response = await scooterController.getScootersBy(params);
        } else {
            response = await scooterController.getScooters();
        }
        res.json(response);
    } catch (err) {
        res.json(err);
    }
};

const postScootersHandler = async (req: Request, res: Response) => {
    try {
        const scooterController = new ScooterController();

        await scooterController.insertScooters(req.body);

        res.json({ status: 'OK' });
    } catch (err) {
        res.json(err);
    }
};

const updateScootersHandler = async (req: Request, res: Response) => {
    try {
        const scooterController = new ScooterController();

        await scooterController.updateScooter(req.body);

        res.json({ status: 'OK' });
    } catch (err) {
        res.json(err);
    }
};

const deleteScootersHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const scooterController = new ScooterController();

        await scooterController.deleteScooter(id);

        res.json({ status: 'OK', message: `Deleted user with id: ${id}` });
    } catch (err) {
        res.json(err);
    }
};

router.get('/', scootersHandler);
router.post('/', postScootersHandler);
router.patch('/', updateScootersHandler);
router.put('/', updateScootersHandler);
router.delete('/:id/', deleteScootersHandler);

export default router;
