const express = require('express');
const router = express.Router();
const verifyUser = require('../middlewares/authMiddleware');

const { getUsers, updateUser } = require('../controllers/user.controller');

router.get('/', getUsers);
router.post('/update/:id', verifyUser, updateUser);

module.exports = router;
