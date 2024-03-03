const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapasync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");

router
    .route("/signup")
    .get(userController.rendersSignupForm)
    .post(wrapAsync(userController.signUp));


router
    .route("/login")
    .get(userController.renderLoginForm)
    .post(saveRedirectUrl, passport.authenticate("local", { failureRedirect: '/login', failureFlash: true }), userController.logIn);


router.get("/logout", userController.logOut);

module.exports = router;


// router.get("/login", userController.renderLoginForm);
// router.post("/login", saveRedirectUrl, passport.authenticate("local", { failureRedirect: '/login', failureFlash: true }), userController.logIn);
// router.get('/signup', userController.rendersSignupForm);
// router.post("/signup", wrapAsync(userController.signUp));