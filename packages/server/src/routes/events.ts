import express from 'express';
import { Router, Request, Response } from 'express';

import EventController from '../controllers/event';
const router: Router = express.Router();

const eventsHandler = (req: Request, res: Response) => {
    const params = req.query;

    const eventController = new EventController();

    let response;
    if (Object.entries(params).length) {
        response = eventController.getEventsBy(params);
    } else {
        response = eventController.getEvents();
    }

    res.json(response);
};

router.get('/', eventsHandler);

export default router;
