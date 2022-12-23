const user = require("../models/user");

module.exports.profile = (req, res) => {
  return res.end("<h1>user profile action</h1>");
};

module.exports.signUp = (req, res) => {
  return res.render("user_sign_up", {
    title: "codiel signUp",
  });
};

module.exports.signIn = (req, res) => {
  return res.render("user_sign_in", {
    title: "codiel signIn",
  });
};

module.exports.createUser = (req, res) => {
  if (req.body.password != req.body.confirm_password) {
    console.log("password did not match ");
    return res.redirect("back");
  }

  user.findOne({ email: req.body.email }, (err, duplicateUser) => {
    if (err) {
      console.log(
        "there was some error trying to find matching email in database "
      );
      return res.redirect("back");
    }

    if (duplicateUser) {
      console.log("email already used please enter different email");
      return res.redirect("back");
    }

    user.create(req.body, (err, newUser) => {
      if (err) {
        console.log("failed to add new user");
        return;
      }

      return res.redirect("/users/sign-in");
    });
  });
};

module.exports.createSession = (req, res) => {
  user.find({ email: req.body.email }, (err, curUser) => {});
};
