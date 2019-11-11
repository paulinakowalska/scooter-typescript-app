const express = require('express');
import { Router } from 'express';
const router: Router = express.Router();
const { getEvents } = require('../controllers/event');

router.get('/', getEvents);

module.exports = router;
