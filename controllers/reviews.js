const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

module.exports.createReview = async(req, res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user;
    console.log(newReview);
    listing.reviews.push(newReview);
    await newReview.save();
    console.log(newReview);
    await listing.save();
    console.log("new review saved");
    req.flash("success", "New review added!");

    res.redirect(`/listings/${id}`);
    
}

module.exports.destroyReview = async(req, res)=>{
    console.log("DELETE route hit with params:", req.params);
    let {id, reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review deleted!");
    res.redirect(`/listings/${id}`);
}