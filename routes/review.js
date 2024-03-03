const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapasync.js");
const {reviewSchema}=require("../schema.js");
const ExpressError=require("../utils/expresserror.js");
const Review=require("../models/reviews.js");
const Listing=require("../models/listing.js");
const {validatereview, isLoggedIn,isAuthor}=require("../middleware.js");
const reviewController=require("../controllers/reviews.js");

router.post("/",isLoggedIn,validatereview,wrapAsync(reviewController.createReview));

router.delete("/:reviewId",isLoggedIn,isAuthor,wrapAsync(reviewController.deleteReview));

module.exports=router;
