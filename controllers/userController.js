const user = require("../models/user");

module.exports.profile = (req, res) => {
  console.log(req.cookies.user_id);

  //cookies are stored in req.headers.cookie in the form of string but cookie parser package convertes it into json format and puts it under req.cookies

  // if there is no user logged in
  if (!req.cookies.user_id) {
    return res.redirect("/users/sign-In");
  }

  user.findById(req.cookies.user_id, (err, u) => {
    return res.render("user_profile", { name: u.name });
  });

  // if i use the below statement without else then what will happen is that this will also get executed regardless of the above statment's result because it is working asyncronysouly i.e above step may take some time to execute but controller will not stop for it to finish and move here so both statments might get executed

  //return res.end(`<h1>Profile page </h1>`);
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
  user.findOne({ email: req.body.email }, (err, curUser) => {
    if (err) {
      console.log("there was some error in fetching data from database ");
      return res.redirect("back");
    }

    if (!curUser) {
      console.log(
        "no account found with this email and password please signUp to codiel to continue"
      );
      return res.redirect("back");
    }

    if (curUser.password != req.body.password) {
      console.log("wrong password or email");
      return res.redirect("back");
    }

    res.cookie("user_id", curUser.id);
    console.log("welcome to codiel");
    return res.redirect("/users/profile");
  });
};
