const express = require('express');
import { Router } from 'express';
const scooter = require('./scooter');
const users = require('./users');
const events = require('./events');

const router: Router = express.Router();

router.use('/scooter', scooter);
router.use('/users', users);
router.use('/events', events);

module.exports = router;
