const asyncHandler = require('express-async-handler');
const Listing = require('../models/listing.model');

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
    if (!listings || listings.length === 0) {
      res.status(404).json({ message: 'No listings found!', status: false });
    }

    res.status(200).json({ listings, status: true });
  } catch (err) {
    res.status(400).json({ msg: err.message, status: false });
  }
});

// @desc    Get all listings
// @route   GET /api/listings
// @access  Public
const getListings = asyncHandler(async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 9;
    const startIndex = Number(req.query.startIndex) || 0;
    let offer = req.query.offer;

    if (offer === undefined || offer === 'false') {
      offer = { $in: [false, true] };
    }

    let furnished = req.query.furnished;

    if (furnished === undefined || furnished === 'false') {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;

    if (parking === undefined || parking === 'false') {
      parking = { $in: [false, true] };
    }

    let type = req.query.type;

    if (type === undefined || type === 'all') {
      type = { $in: ['sale', 'rent'] };
    }

    const searchTerm = req.query.searchTerm || '';
    const sort = req.query.sort || 'createdAt';
    const order = req.query.order || 'desc';

    const listings = await Listing.find({
      $and: [
        { offer },
        { furnished },
        { parking },
        { type },
        {
          $or: [
            { title: { $regex: searchTerm, $options: 'i' } },
            { description: { $regex: searchTerm, $options: 'i' } },
            { address: { $regex: searchTerm, $options: 'i' } },
          ],
        },
      ],
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

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
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      res.status(404).json({ message: 'Listing not found!', status: false });
    }

    if (req.user._id.toString() !== listing.userRef.toString()) {
      res
        .status(401)
        .json({ message: 'You can only delete your listings!', status: false });
    }

    const deletedListing = await Listing.findByIdAndDelete(req.params.id);

    if (!deletedListing) {
      res
        .status(404)
        .json({ message: 'Error, Listing not deleted!', status: false });
    }

    res.status(200).json({ status: true });
  } catch (err) {
    res.status(400).json({ msg: err.message, status: false });
  }
});

// @desc   Update a listing
// @route  PUT /api/listings/:id
// @access Private
const updateListing = asyncHandler(async (req, res) => {
  try {
    const listing = await Listing.findById(req.params?.id);

    if (!listing) {
      res.status(404).json({
        message: 'Listing not found!',
        status: false,
      });
    }

    if (listing.userRef.toString() !== req.user._id.toString()) {
      res
        .status(401)
        .json({ message: 'You can only update your listings!', status: false });
    }

    const updatedListing = await Listing.findByIdAndUpdate(
      req.params?.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedListing) {
      res.status(404).json({
        message: 'Error, Listing not updated!',
        status: false,
      });
    }

    res.status(200).json({ updatedListing, status: true });
  } catch (err) {
    res.status(400).json({ msg: err.message, status: false });
  }
});

module.exports = {
  createListing,
  getUserListing,
  getListings,
  getListing,
  deleteListing,
  updateListing,
};
