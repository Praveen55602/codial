const post = require("../models/posts");

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
