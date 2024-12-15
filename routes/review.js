const express = require("express");
const router = express.Router({ mergeParams: true }); //important

const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, validateReview, isAuthor } = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");

//post
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview)
);
//delete
router.delete(
  "/:reviewId",
  isLoggedIn,
  isAuthor,
  wrapAsync(reviewController.destroyReview)
);

module.exports = router;
