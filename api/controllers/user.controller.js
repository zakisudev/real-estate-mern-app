const User = require('../models/user.model');
const asyncHandler = require('express-async-handler');
const { hashPassword } = require('../utils/security');

// @desc    Get all users
// @route   GET /api/users
// @access  Public
const getUsers = asyncHandler(async (_, res) => {
  try {
    const users = await User.find();
    if (!users) throw Error('No users exist');
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

// @desc    Create a user
// @route   POST /api/users
// @access  Public
const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = await User.create({ name, email, password });
    if (!newUser) throw Error('Something went wrong while saving the user');
    res.status(200).json(newUser);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

// @desc    Delete a user
// @route   DELETE /api/users/:id
// @access  Public
const deleteUser = asyncHandler(async (req, res) => {
  if (req.user._id !== req.params.id) {
    res.status(401).json('You can update only your account!');
  }

  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      res.status(404).json({ message: 'User not found!', status: false });
    }

    res
      .status(200)
      .cookie('jwt', null, {
        httpOnly: true,
        expires: new Date(0),
      })
      .json({ success: true });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

// @desc    Update a user
// @route   PUT /api/users/:id
// @access  Public
const updateUser = asyncHandler(async (req, res) => {
  if (req.user._id !== req.params.id) {
    res.status(401).json('You can update only your account!');
  }

  if (req.body.password) {
    const hash = await hashPassword(req.body.password);
    req.body.password = hash;
  }

  const { username, email, password, avatar } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username,
          email,
          password,
          avatar,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      res.status(404).json({ message: 'User not found!', status: false });
    }

    res.status(200).json({
      username: updatedUser.username,
      email: updatedUser.email,
      avatar: updatedUser.avatar,
      success: true,
    });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

module.exports = { getUsers, createUser, deleteUser, updateUser };
