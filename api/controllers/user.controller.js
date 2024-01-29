const User = require('../models/user.model');
const Listing = require('../models/listing.model');
const asyncHandler = require('express-async-handler');
const { hashPassword } = require('../utils/security');

// @desc    Get all users
// @route   GET /api/users
// @access  Public
const getUsers = asyncHandler(async (_, res) => {
  try {
    const users = await User.find();
    if (!users) throw Error('No users exist');
    res.status(200).json(users, { status: true });
  } catch (err) {
    res.status(400).json({ msg: err.message, status: false });
  }
});

// @desc    Delete a user
// @route   DELETE /api/users/:id
// @access  Public
const deleteUser = asyncHandler(async (req, res) => {
  if (req.user._id !== req.params.id) {
    res
      .status(401)
      .json({ message: 'You can update only your account!', status: false });
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
      .json({ status: true });
  } catch (err) {
    res.status(400).json({ msg: err.message, status: false });
  }
});

// @desc    Update a user
// @route   PUT /api/users/:id
// @access  Public
const updateUser = asyncHandler(async (req, res) => {
  if (req.user._id !== req.params.id) {
    res
      .status(401)
      .json({ message: 'You can update only your account!', status: false });
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
      status: true,
    });
  } catch (err) {
    res.status(400).json({ msg: err.message, status: false });
  }
});

module.exports = {
  getUsers,
  deleteUser,
  updateUser,
};
