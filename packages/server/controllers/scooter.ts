import { Request, Response } from 'express';
const Scooter = require('../models/scooterModel');

module.exports = {
    getScooters: (req: Request, res: Response) => {
        const params = req.query;

        const scooter = new Scooter();

        let scootersData = [];
        if (Object.entries(params).length) {
            scootersData = scooter.getSelectedScooters(params);
        } else {
            scootersData = scooter.scooters;
        }
        res.json(scootersData);
    },
};
