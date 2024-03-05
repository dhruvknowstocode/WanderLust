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


    const trendCountries = {
        trending: ['USA', 'Canada', 'UK', 'India', 'Australia', 'Brazil', 'South Korea', 'Mexico', 'Netherlands', 'Singapore'],
        room: ['Canada', 'Germany', 'Japan', 'Italy', 'France', 'Spain', 'China', 'South Africa', 'India', 'Mexico'],
        Iconic: ['France', 'Italy', 'Spain', 'USA', 'China', 'India', 'Egypt', 'Greece', 'Turkey', 'Brazil'],
        Mountains: ['Switzerland', 'Nepal', 'Canada', 'Austria', 'Argentina', 'Chile', 'Peru', 'New Zealand', 'Norway', 'Japan'],
        Castles: ['Germany', 'Austria', 'France', 'Poland', 'Scotland', 'Ireland', 'Portugal', 'Czech Republic', 'Hungary', 'Spain'],
        pools: ['Thailand', 'Maldives', 'Greece', 'Indonesia', 'Mexico', 'Philippines', 'Vietnam', 'Croatia', 'Turkey', 'Egypt'],
        Camping: ['Canada', 'USA', 'Australia', 'New Zealand', 'South Africa', 'Sweden', 'Finland', 'Norway', 'Chile', 'Argentina'],
        farms: ['Netherlands', 'New Zealand', 'Canada', 'Australia', 'Argentina', 'Ireland', 'Denmark', 'France', 'Germany', 'Switzerland'],
        arctic: ['Norway', 'Canada', 'Russia', 'Greenland', 'Iceland', 'Sweden', 'Finland', 'Alaska', 'Denmark', 'Scotland'],
        doms: ['Russia', 'Norway', 'Finland', 'Canada', 'USA', 'Sweden', 'Denmark', 'Switzerland', 'Germany', 'Austria'],
        island: ['Maldives', 'Bora Bora', 'Seychelles', 'Hawaii', 'Fiji', 'Philippines', 'Bali', 'Mauritius', 'Jamaica', 'Bahamas'],
        cafe: ['Italy', 'France', 'Japan', 'USA', 'Australia', 'Spain', 'South Korea', 'Vietnam', 'Brazil', 'Turkey'],
        artistic: ['Italy', 'France', 'Spain', 'USA', 'Japan', 'South Korea', 'Mexico', 'India', 'Argentina', 'Russia'],
        view: ['Switzerland', 'Canada', 'USA', 'New Zealand', 'Norway', 'Australia', 'Austria', 'Chile', 'Scotland', 'Iceland'],
    };
    
    
      

router.get("/find/:filter",(req,res,next)=>{
    try {
        let { filter } = req.params;
        const countries = trendCountries[filter] || [];
        res.render("listings/filter.ejs", { filter, countries });
    } catch (err) {
        next(err);
    }
});

router.get("/new", isLoggedIn, listingController.renderNewForm);

// router.get("/filter/counrty",async (req,res,next)=>{
//     try {
//         const { country } = req.query;
//         const filteredListings = await Listing.find({ country: { $regex: new RegExp(country, 'i') } });
//         res.render("listings/search", { listings: filteredListings, country });
//     } catch (err) {
//         next(err);
//     }
// })

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