const post = require("../models/posts");
const comment = require("../models/comments");

module.exports.createPost = (req, res) => {
  console.log("trying to create post");
  post.create(
    {
      content: req.body.postContent,
      user: req.user._id,
    },
    (err, newPost) => {
      if (err) {
        console.log("failed to create the post due to some error");
        return;
      }
      console.log("new post created successfully", newPost);
      return res.redirect("back");
    }
  );
};

module.exports.destroy = (req, res) => {
  post.findById(req.params.id, (err, foundPost) => {
    //console.log(tos);
    if (foundPost.user == req.user.id) {
      console.log(req.user.id);
      foundPost.remove();
      console.log("post deleted successfully!");
      comment.deleteMany({ post: req.params.id }, (err) => {
        console.log("comments deleted successfully!");
        return res.redirect("back");
      });
    } else console.log("some error while deleting the post ");
  });
};
