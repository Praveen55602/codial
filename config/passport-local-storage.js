const passport = require("passport");
const UserModel = require("../models/user");
const LocalStrategy = require("passport-local").Strategy;

// the post route uses this middleware to authencticate user after passing from here it will go to the userController.createSession action only in case if it is successfully in authentication
passport.use(
  new LocalStrategy(
    {
      usernameField: "email", // this will same as defined in the user model file
    },
    (enteredEmail, password, done) => {
      UserModel.findOne({ email: enteredEmail }, function (err, user) {
        if (err) {
          console.log("there was some error");
          return done(err);
        }
        if (!user) {
          // done is function withe first parameter as error and second as the user which is found in db
          console.log("no user found");
          return done(null, false);
        }
        if (user.password != password) {
          console.log("wrong password");
          return done(null, false);
        }
        return done(null, user); // this done sends the user to serialize function which then creates the cookie using the setting provided in the index.js file
      });
    }
  )
);

// serializing the user to decide which key is to be kept in the cookies for verification
passport.serializeUser((user, done) => {
  return done(null, user.id);
});

// derserializing the user from the key in the cookies
passport.deserializeUser((userId, done) => {
  UserModel.findById(userId, (err, newuser) => {
    done(null, newuser);
  });
});

//check if the user is autheticated
passport.checkAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/users/sign-In");
  //next();
};

passport.setAuthUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }

  next();
};

module.exports = passport;
