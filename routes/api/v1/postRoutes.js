const express = require("express");
const router = express.Router();
const passport = require("passport");
const postApi = require("../../../controllers/api/v1/posts_api");

router.get("/", postApi.GetAllPosts);
router.delete(
  "/deletePost/:id",
  passport.authenticate("jwt", { session: false }),
  postApi.DeletePost
);

module.exports = router;
