const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    address: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    bathrooms: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 3,
    },
    bedrooms: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 3,
    },
    furnished: {
      type: Boolean,
      default: false,
    },
    parking: {
      type: Boolean,
      default: false,
    },
    regularPrice: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 32,
    },
    discountPrice: {
      type: Number,
      trim: true,
      maxlength: 32,
    },
    type: {
      type: String,
      required: true,
    },
    offer: {
      type: Boolean,
      default: false,
      required: true,
    },
    imageURLs: {
      type: Array,
      default: [],
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
