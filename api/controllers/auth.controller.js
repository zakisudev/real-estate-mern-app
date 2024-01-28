const User = require('../models/user.model');
const { hashPassword, comparePassword } = require('../utils/security');
const asyncHandler = require('express-async-handler');
const { generateToken } = require('../utils/security');

// @desc    Sign up a user
// @route   POST /api/auth/signup
// @access  Public
const signup = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userExist =
      (await User.findOne({ email })) || (await User.findOne({ username }));
    if (userExist) {
      return res
        .status(400)
        .json({ message: 'User already exists', status: false });
    }

    const user = await User.create({
      username,
      email,
      password: hashPassword(password).toString(),
    });
    if (!user) {
      return res.status(400).json({
        message: 'Something went wrong while saving the user',
        status: false,
      });
    }

    return res.status(201).json({
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
      status: true,
    });
  } catch (err) {
    return res.status(400).json({ message: err, status: false });
  }
});

// @desc    Login a user
// @route   POST /api/auth/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const isMatch = comparePassword(password, user.password);
    if (!user || !isMatch) {
      return res
        .status(400)
        .json({ message: 'Invalid email or password', status: false });
    }

    const token = generateToken(user);
    return res
      .cookie('jwt', token, { httpOnly: true })
      .status(201)
      .json({
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
        },
        status: true,
      });
  } catch (err) {
    return res.status(400).json({ message: err, status: false });
  }
});

module.exports = { signup, login };
