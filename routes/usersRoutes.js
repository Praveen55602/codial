// this file will contain all the routes associated with the /user then this route will call appropriate action for the user's request from the userController

const express = require("express");
const passport = require("passport");

const router = express.Router();

const userController = require("../controllers/userController");

// so the actual route is /user/profile but since it's user Route file therefore all routes starting with /user will come inside this file
// when we go to this router first we will go this passport.checkAuth middleware
router.get("/profile", passport.checkAuth, userController.profile);

router.get("/sign-Up", userController.signUp);

router.get("/sign-In", userController.signIn);

router.get("/sign-Out", userController.destroySession);

router.post("/create", userController.createUser);

// this can use a third argument which is a middleware
router.post(
  "/create-session",
  passport.authenticate("local", {
    failureRedirect: "/users/sign-In",
    failureMessage: "wrong username or password",
  }),
  userController.createSession
);

console.log("Router Loaded");
module.exports = router;
