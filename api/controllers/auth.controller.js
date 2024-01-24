const User = require('../models/user.model');
const hashPassword = require('../utils/hashPassword');

// @desc    Sign up a user
// @route   POST /api/auth/signup
// @access  Public
const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({
      username,
      email,
      password: hashPassword(password).toString(),
    });
    if (!user) throw Error('Something went wrong while saving the user');
    res.status(201).json(user);
  } catch (err) {
    res.status(400);
    throw new Error({ msg: err });
  }
};

// @desc    Login a user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.find({ email });
    if (!user) throw Error('User does not exist');
    res.status(200).json(user);
  } catch (err) {
    res.status(400);
    throw new Error({ msg: err });
  }
};

module.exports = { signup, login };
