const express = require('express');
const verifyUser = require('../middlewares/authMiddleware');
const { createListing } = require('../controllers/listing.controller');
const router = express.Router();

// @desc    Create a new listing
// @route   POST /api/listing
// @access  Private
router.post('/', verifyUser, createListing);

module.exports = router;
