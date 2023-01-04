// this file will contain all the routes associated with the homepage then this route will call appropriate action for the user's request from the homeController

const express = require("express");

const router = express.Router();

const homeController = require("../controllers/homeController");

router.get("/", homeController.home);
//router.get("/login", homeController.login);

// since /user is also a kind of homeRoute as it start with home therefore it must be handled by the homeRoutes.js now it redirects it to userRoutes.js and ask it to further handle it
router.use("/users", require("./usersRoutes"));
router.use("/post", require("./postRoutes"));
router.use("/comments", require("./commentRoutes"));
// if the name of file would have been index then we don't need to mention the name
router.use("/api", require("./api/apiindex"));

console.log("Router Loaded");
module.exports = router;
