// controller will contain different actions
const posts = require("../models/posts");
const User = require("../models/user");

module.exports.home = async (req, res) => {
  // posts.find({}, (err, all) => {
  //   console.log(all);
  //   return res.render("home", {
  //     title: "home",
  //     allPosts: all,
  //   });
  // });

  // picks the complete user using the userid from post and then creates a new object with all posts and all complete users
  // posts
  //   .find({})
  //   .populate("user")
  //   .populate({
  //     path: "comments",
  //     populate: {
  //       path: "user",
  //     },
  //   })
  //   .exec((err, allposts) => {
  //     return res.render("home", {
  //       title: "home",
  //       allPosts: allposts,
  //     });
  //   });

  //above code using asyn await
  // await will make the controller wait while this query finishes bcz it is going to take some time if await is not used then controller will directly move on to render statement without waiting for result
  try {
    let allposts = await posts
      .find({})
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      });

    return res.render("home", {
      title: "home",
      allPosts: allposts,
    });
  } catch (error) {
    console.log("Some Error occured", error);
    return;
  }
};

module.exports.login = (req, res) => {
  return res.render("login");
};
