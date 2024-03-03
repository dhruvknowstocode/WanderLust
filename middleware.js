const Listing=require("./models/listing.js");
const Review=require("./models/reviews.js");
const {listingSchema,reviewSchema}=require("./schema.js");
const ExpressError=require("./utils/expresserror.js");
module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","You must be logged in!!");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async (req,res,next)=>{
    const { id } = req.params;
    let listing =await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error","You are not the owner of this list");
        return res.redirect(`/listings/${id}`)
    }
    next();
};

module.exports.isAuthor = async (req,res,next)=>{
    const {id,reviewId } = req.params;
    let review =await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error","You are not the author of this review!!");
        return res.redirect(`/listings/${id}`)
    }
    next();
};

module.exports.validatelisting = (req, res, next) => {
    const { error } = listingSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const errorMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errorMsg);
    } else {
        next();
    }
};

module.exports.validatereview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const errorMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errorMsg);
    } else {
        next();
    }
};