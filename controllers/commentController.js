const comment = require("../models/comments");
const posts = require("../models/posts");

module.exports.createComment = (req, res) => {
  //console.log(req.query.postId);
  posts.findById(req.query.postId, (err, found) => {
    if (found) {
      comment.create(
        {
          content: req.body.comment,
          post: req.query.postId,
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
  return res.redirect("/");
  //   comment.create();
};

module.exports.destroy = (req, res) => {
  comment.findById(req.params.id, (err, foundComment) => {
    if (foundComment.user == req.user.id) {
      let postId = foundComment.post;
      foundComment.remove();

      //pull pulls the object from the array
      posts.findByIdAndUpdate(
        postId,
        { $pull: { comments: req.params.id } },
        (err, pulled) => {
          return res.redirect("back");
        }
      );

      console.log("failed to remove comment from posts collections");
    } else {
      console.log("access denied");
      return res.redirect("back");
    }
  });
  //console.log("failed to delete the comment");
  //return res.redirect("back");
};
