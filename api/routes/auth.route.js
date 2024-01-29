const express = require('express');
const verifyUser = require('../middlewares/authMiddleware');

const {
  signup,
  login,
  logout,
  googleLogin,
} = require('../controllers/auth.controller');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', verifyUser, logout);
router.post('/google-login', googleLogin);

module.exports = router;
