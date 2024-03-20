const express = require('express');
const router = express.Router();
const { verifyUser, verifyAdmin } = require('../middlewares/authMiddleware');

const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require('../controllers/user.controller');

router.get('/', verifyUser, verifyAdmin, getUsers);
router.get('/:id', verifyUser, getUser);
router.post('/update/:id', verifyUser, updateUser);
router.delete('/delete/:id', verifyUser, deleteUser);

module.exports = router;
