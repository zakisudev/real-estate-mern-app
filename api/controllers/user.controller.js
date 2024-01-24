const User = require('../models/user.model');

// @desc    Get all users
// @route   GET /api/users
// @access  Public
const getUsers = async (_, res) => {
  try {
    const users = await User.find();
    if (!users) throw Error('No users exist');
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

// @desc    Create a user
// @route   POST /api/users
// @access  Public
const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = await User.create({ name, email, password });
    if (!newUser) throw Error('Something went wrong while saving the user');
    res.status(200).json(newUser);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

// @desc    Delete a user
// @route   DELETE /api/users/:id
// @access  Public
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) throw Error('No user found');
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

// @desc    Update a user
// @route   PUT /api/users/:id
// @access  Public
const updateUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      name,
      email,
      password,
    });
    if (!user) throw Error('No user found');
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

module.exports = { getUsers, createUser, deleteUser, updateUser };
