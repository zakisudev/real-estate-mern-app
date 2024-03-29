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
      password: await hashPassword(password),
    });
    if (!user) {
      return res.status(400).json({
        message: 'Something went wrong while creating the user',
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
    if (!user) {
      return res
        .status(400)
        .json({ message: 'Invalid email or password', status: false });
    }

    const isMatch = await comparePassword(password, user.password);

    if (!user || !isMatch) {
      return res
        .status(400)
        .json({ message: 'Invalid email or password', status: false });
    }

    return res
      .cookie('jwt', generateToken(user), { httpOnly: true })
      .status(200)
      .json({
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          avatar: user.avatar,
        },
        status: true,
      });
  } catch (err) {
    return res.status(400).json({ message: err?.message, status: false });
  }
});

// @desc    Logout a user
// @route   POST /api/auth/logout
// @access  Public
const logout = asyncHandler(async (_, res) => {
  try {
    res
      .status(200)
      .cookie('jwt', null, {
        httpOnly: true,
        expires: new Date(0),
      })
      .json({ status: true });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

// @desc    Login a user with Google
// @route   POST /api/auth/google-login
// @access  Public
const googleLogin = asyncHandler(async (req, res) => {
  const { email, username, avatar } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      return res
        .cookie('jwt', generateToken(user), { httpOnly: true })
        .status(200)
        .json({
          user: {
            _id: user._id,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
          },
          status: true,
        });
    } else {
      const password =
        Math.random().toString(36).slice(-8) + email + process.env.JWT_SECRET;

      const user = await User.create({
        username:
          username.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-8),
        email,
        password: await hashPassword(password),
        avatar,
      });

      if (!user) {
        return res.status(400).json({
          message: 'Something went wrong while saving the user',
          status: false,
        });
      }

      return res
        .cookie('jwt', generateToken(user), { httpOnly: true })
        .status(201)
        .json({
          user: {
            _id: user._id,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
          },
          status: true,
        });
    }
  } catch (err) {
    return res.status(400).json({ message: err, status: false });
  }
});

module.exports = { signup, login, logout, googleLogin };
