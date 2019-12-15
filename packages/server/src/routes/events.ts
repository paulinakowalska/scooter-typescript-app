import express from 'express';
import { Router, Request, Response } from 'express';

import EventController from '../controllers/event';
const router: Router = express.Router();

const eventsHandler = async (req: Request, res: Response) => {
    const params = req.query;

    const eventController = new EventController();

    let response;
    if (Object.entries(params).length) {
        response = await eventController.getEventsBy(params);
    } else {
        response = await eventController.getEvents();
    }

    res.json(response);
};

const postEventsHandler = async (req: Request, res: Response) => {
    try {
        const eventsController = new EventController();

        await eventsController.insertEvent(req.body.events);

        res.json({ status: 'OK' });
    } catch (err) {
        res.json({ err });
    }
};

const deleteEventsHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const eventController = new EventController();

        const response = await eventController.deleteEvent(id);

        res.json(response);
    } catch (err) {
        res.json({ err });
    }
};

const updateEventsHandler = async (req: Request, res: Response) => {
    try {
        const eventController = new EventController();

        await eventController.updateEvent(req.body.event);

        res.json({ status: 'OK' });
    } catch (err) {
        res.json({ err });
    }
};

router.get('/', eventsHandler);
router.post('/', postEventsHandler);
router.delete('/:id/', deleteEventsHandler);
router.patch('/', updateEventsHandler);

export default router;
