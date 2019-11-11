const express = require('express');
import { Router } from 'express';
const router: Router = express.Router();
const { getUsers } = require('../controllers/users');

router.get('/', getUsers);

module.exports = router;
