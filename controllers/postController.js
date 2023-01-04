const post = require("../models/posts");
const comment = require("../models/comments");

module.exports.createPost = async (req, res) => {
  //without asyn
  // post.create(
  //   {
  //     content: req.body.postContent,
  //     user: req.user._id,
  //   },
  //   (err, newPost) => {
  //     if (err) {
  //       console.log("failed to create the post due to some error");
  //       return;
  //     }
  //     console.log("new post created successfully", newPost);
  //     return res.redirect("back");
  //   }
  // );

  //with async
  // this will return the complete newly post object created
  // can put it inside try catch
  await post.create({
    content: req.body.postContent,
    user: req.user._id,
  });

  return res.redirect("back");
};

module.exports.destroy = async (req, res) => {
  try {
    let foundPost = await post.findById(req.params.id);

    if (foundPost.user == req.user.id) {
      await foundPost.remove();
      console.log("post deleted successfully!");
      await comment.deleteMany({ post: req.params.id });
      console.log("comments deleted successfully!!");
    }
    return res.redirect("back");
  } catch (error) {
    console.log(error);
    return;
  }
  // post.findById(req.params.id, (err, foundPost) => {
  //   //console.log(tos);
  //   if (foundPost.user == req.user.id) {
  //     foundPost.remove();
  //     console.log("post deleted successfully!");
  //     comment.deleteMany({ post: req.params.id }, (err) => {
  //       console.log("comments deleted successfully!");
  //       return res.redirect("back");
  //     });
  //   } else console.log("some error while deleting the post ");
  // });
};
