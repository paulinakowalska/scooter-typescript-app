import { Request, Response } from 'express';
const Event = require('../models/eventModel');

module.exports = {
    getEvents: (req: Request, res: Response) => {
        const params = req.query;
        const event = new Event();

        let events = [];
        if (Object.entries(params).length) {
            events = event.getSelectedEvents(params);
        } else {
            events = event.events;
        }

        res.json(events);
    },
};
