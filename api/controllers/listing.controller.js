const asyncHandler = require('express-async-handler');
const Listing = require('../models/listing.model');
const { default: mongoose } = require('mongoose');

// @desc    Create a listing
// @route   POST /api/users/listings
// @access  Private
const createListing = asyncHandler(async (req, res) => {
  const createdListing = await Listing.create({
    ...req.body,
    userRef: req.user._id.toString(),
  });
  if (!createdListing) {
    res.status(400).json({ message: 'Invalid listing data', success: false });
  }

  res.status(201).json({ createdListing, status: true });
});

// @desc    Get all listings of a user
// @route   GET /api/users/listings/:id
// @access  Private
const getUserListing = asyncHandler(async (req, res) => {
  if (req.user._id !== req.params.id) {
    res
      .status(401)
      .json({ message: 'You can only view your listings!', status: false });
  }

  try {
    const listings = await Listing.find({ userRef: req.params.id });
    if (!listings) {
      res.status(404).json({ message: 'No listings found!', status: false });
    }

    res.status(200).json({ listings, status: true });
  } catch (err) {
    res.status(400).json({ msg: err.message, status: false });
  }
});

// @desc    Get a listing
// @route   GET /api/users/listings/:id
// @access  Private
const getListing = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    res.status(404).json({ message: 'Listing not found!', status: false });
  }

  res.status(200).json({ listing, status: true });
});

// @desc    Delete a listing
// @route   DELETE /api/users/listings/:id
// @access  Private
const deleteListing = asyncHandler(async (req, res) => {
  const listing = await Listing.findByIdAndDelete(req.params.id);
  if (listing.userRef !== req.user._id.toString()) {
    res
      .status(401)
      .json({ message: 'You can only delete your listings!', status: false });
  }

  if (!listing) {
    res.status(404).json({ message: 'Listing not found!', status: false });
  }

  res.status(200).json({ status: true });
});

// @desc   Update a listing
// @route  PUT /api/listings/:id
// @access Private
const updateListing = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params?.id);

  if (!listing) {
    res.status(404).json({
      message: 'Listing not found!',
      status: false,
    });
  }

  if (listing.userRef !== req.user._id.toString()) {
    res
      .status(401)
      .json({ message: 'You can only update your listings!', status: false });
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params?.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({ updatedListing, status: true });
  } catch (err) {
    res.status(400).json({ msg: err.message, status: false });
  }
});

module.exports = {
  createListing,
  getUserListing,
  getListing,
  deleteListing,
  updateListing,
};
