const express = require('express');
import { Router } from 'express';
const router: Router = express.Router();
const { getScooters } = require('../controllers/scooter');

router.get('/', getScooters);

module.exports = router;
