const express = require('express');
const router = express.Router();
const verifyUser = require('../middlewares/authMiddleware');

const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require('../controllers/user.controller');

router.get('/', getUsers);
router.get('/:id', verifyUser, getUser);
router.post('/update/:id', verifyUser, updateUser);
router.delete('/delete/:id', verifyUser, deleteUser);

module.exports = router;
