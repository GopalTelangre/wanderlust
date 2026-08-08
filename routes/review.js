const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../schema.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

const {
  isLoggedIn,
  isReviewAuthor,
  validateReview,
} = require("../middleware.js");

const { createReview, destroyReview } = require("../controllers/reviews.js");

// POST Create Review Route
router.post("/", isLoggedIn, validateReview, wrapAsync(createReview));

// DELETE Review Route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(destroyReview),
);

module.exports = router;
