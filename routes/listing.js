const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapasync.js");
const { listingSchema } = require("../schema.js");
const ExpressError = require("../utils/expresserror.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validatelisting } = require("../middleware.js");

const multer = require('multer');
const { storage } = require("../cloudconfig.js");
const upload = multer({ storage });

const listingController = require("../controllers/listing.js");

router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn, upload.single("listing[image]"), validatelisting, wrapAsync(listingController.createListing));


router.get("/new", isLoggedIn, listingController.renderNewForm);

router
    .route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn, isOwner, upload.single("listing[image]"), validatelisting, wrapAsync(listingController.updateListing))
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListingd));




router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));



module.exports = router;

// router.put("/:id", isLoggedIn, isOwner, validatelisting, wrapAsync(listingController.updateListing));
// router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingController.deleteListingd));
// router.get("/",wrapAsync(listingController.index));
// router.post("/",isLoggedIn,validatelisting,wrapAsync(listingController.createListing));
// router.get("/:id", wrapAsync(listingController.showListing));