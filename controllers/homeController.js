// controller will contain different actions
const posts = require("../models/posts");

module.exports.home = (req, res) => {
  // posts.find({}, (err, all) => {
  //   console.log(all);
  //   return res.render("home", {
  //     title: "home",
  //     allPosts: all,
  //   });
  // });

  // picks the complete user using the userid from post and then creates a new object with all posts and all complete users
  posts
    .find({})
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    })
    .exec((err, allposts) => {
      return res.render("home", {
        title: "home",
        allPosts: allposts,
      });
    });
};

module.exports.login = (req, res) => {
  return res.render("login");
};
