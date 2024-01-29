const express = require('express');
const router = express.Router();
const verifyUser = require('../middlewares/authMiddleware');

const {
  getUsers,
  updateUser,
  deleteUser,
  getUserListing,
} = require('../controllers/user.controller');

router.get('/', getUsers);
router.post('/update/:id', verifyUser, updateUser);
router.delete('/delete/:id', verifyUser, deleteUser);
router.get('/listings:id', verifyUser, getUserListing);

module.exports = router;
