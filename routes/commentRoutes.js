const express = require("express");
const commentController = require("../controllers/commentController");
const router = express.Router();

router.post("/create-comment", commentController.createComment);

module.exports = router;
