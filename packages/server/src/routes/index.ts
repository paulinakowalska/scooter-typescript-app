import express from 'express';
import { Router } from 'express';
import scooter from './scooter';
import users from './users';
import events from './events';

const router: Router = express.Router();

router.use('/scooter', scooter);
router.use('/users', users);
router.use('/events', events);

export default router;
