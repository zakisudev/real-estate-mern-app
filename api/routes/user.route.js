const express = require('express');
const router = express.Router();
// User Model
const User = require('../models/user.model');
const { getUsers } = require('../controllers/user.controller');

router.get('/', getUsers);

module.exports = router;
