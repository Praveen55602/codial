const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const User = require("../models/user");

let options = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: "codial",
};

passport.use(
  new JwtStrategy(options, (jwtPayLoad, done) => {
    User.findById(jwtPayLoad._id, (err, user) => {
      if (err) {
        console.log("error while fetching user from the database");
        return;
      }

      if (user) return done(null, user);
      else return done(null, false);
    });
  })
);

module.exports = passport;
