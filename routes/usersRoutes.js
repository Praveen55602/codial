// this file will contain all the routes associated with the /user then this route will call appropriate action for the user's request from the userController

const express = require("express");

const router = express.Router();

const userController = require("../controllers/userController");

// so the actual route is /user/profile but since it's user Route file therefore all routes starting with /user will come inside this file
router.get("/profile", userController.profile);

router.get("/sign-Up", userController.signUp);

router.get("/sign-In", userController.signIn);

router.post("/create", userController.createUser);

router.post("/create-Session", userController.createSession);

console.log("Router Loaded");
module.exports = router;
