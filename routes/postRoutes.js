const express = require("express");
const passport = require("passport");

const router = express.Router();

const postController = require("../controllers/postController");

router.post("/create-post", passport.checkAuth, postController.createPost);

router.get("/delete-post/:id", passport.checkAuth, postController.destroy);

module.exports = router;
