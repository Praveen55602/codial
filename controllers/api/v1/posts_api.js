const comments = require("../../../models/comments");
const Post = require("../../../models/posts");

module.exports.GetAllPosts = async function (req, res) {
  let foundPost = await Post.find({});
  return res.json(200, {
    message: "list of posts",
    posts: foundPost,
  });
};

module.exports.DeletePost = async (req, res) => {
  try {
    let foundPost = await Post.findById(req.params.id);

    console.log(req.user);
    // if (foundPost.user != req.user.id)
    //   return res.json(401, {
    //     messsage: "You are not authorized",
    //   });

    // await foundPost.remove();
    // console.log("post deleted successfully!");
    // await comments.deleteMany({ post: req.params.id });
    // console.log("comments deleted successfully!!");

    return res.json(200, {
      message: "post and assosiated comments deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.json(500, {
      message: "some error occurred!",
    });
  }
};
