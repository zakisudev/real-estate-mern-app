const asyncHandler = require('express-async-handler');
const Listing = require('../models/listing.model');

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

module.exports = { createListing };
