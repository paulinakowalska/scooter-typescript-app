import express from 'express';
import { Router, Request, Response } from 'express';

import EventController from '../controllers/event';

const router: Router = express.Router();

const eventsHandler = async (req: Request, res: Response) => {
    try {
        const params = req.query;

        const eventController = new EventController();

        let response;
        if (Object.entries(params).length) {
            response = await eventController.getEventsBy(params);
        } else {
            response = await eventController.getEvents();
        }
        res.json(response);
    } catch (err) {
        res.json(err);
    }
};

const postEventsHandler = async (req: Request, res: Response) => {
    try {
        const eventsController = new EventController();

        await eventsController.insertEvent(req.body);

        res.json({ status: 'OK' });
    } catch (err) {
        res.json(err);
    }
};

const updateEventsHandler = async (req: Request, res: Response) => {
    try {
        const eventController = new EventController();

        await eventController.updateEvent(req.body);

        res.json({ status: 'OK' });
    } catch (err) {
        res.json(err);
    }
};

const deleteEventsHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const eventController = new EventController();

        await eventController.deleteEvent(id);

        res.json({ status: 'OK', message: `Deleted user with id: ${id}` });
    } catch (err) {
        res.json(err);
    }
};

router.get('/', eventsHandler);
router.post('/', postEventsHandler);
router.patch('/', updateEventsHandler);
router.put('/', updateEventsHandler);
router.delete('/:id/', deleteEventsHandler);

export default router;
