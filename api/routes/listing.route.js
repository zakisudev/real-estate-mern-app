const express = require('express');
const verifyUser = require('../middlewares/authMiddleware');
const {
  createListing,
  getUserListing,
  getListings,
  getListing,
  deleteListing,
  updateListing,
} = require('../controllers/listing.controller');
const router = express.Router();

// @desc    Create a new listing
// @route   POST /api/listings/create
// @access  Private
router.post('/create', verifyUser, createListing);

// @desc    Get all listings of a user
// @route   GET /api/listings/user/:id
// @access  Private
router.get('/user/:id', verifyUser, getUserListing);

// @desc    Get all listings
// @route   GET /api/listings/
// @access  Public
router.get('/', getListings);
// @desc    Get a listing
// @route   GET /api/listings/:id
// @access  Public
router.get('/:id', getListing);

// @desc    Delete a listing
// @route   DELETE /api/listings/:id
// @access  Private
router.delete('/:id', verifyUser, deleteListing);

// @desc    Update a listing
// @route   PUT /api/listings/:id
// @access  Private
router.put('/:id', verifyUser, updateListing);

module.exports = router;
