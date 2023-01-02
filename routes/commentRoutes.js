const express = require("express");
const commentController = require("../controllers/commentController");
const passport = require("passport");
const router = express.Router();

router.post("/create-comment", commentController.createComment);

router.get(
  "/delete-comment/:id",
  passport.checkAuth,
  commentController.destroy
);

module.exports = router;
