const comment = require("../models/comments");
const posts = require("../models/posts");

module.exports.createComment = (req, res) => {
  //console.log(req.query.postId);
  posts.findById(req.query.postId, (err, found) => {
    if (found) {
      comment.create(
        {
          content: req.body.comment,
          post: req.query.id,
          user: req.user._id,
        },
        (err, comm) => {
          if (!comm) return;
          console.log("comment created!");

          found.comments.push(comm);
          found.save();
        }
      );
    }
  });
  res.redirect("/");
  //   comment.create();
};
