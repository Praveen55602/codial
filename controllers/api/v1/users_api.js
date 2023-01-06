const User = require("../../../models/user");
const jwt = require("jsonwebtoken");

module.exports.createSession = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user || user.password != req.body.password) {
      console.log("wrong username or password");
      return res.json(422, {
        message: "Invalid username or password",
      });
    }
    //res.locals.user = user;
    //console.log(req.user);
    return res.json(200, {
      message: "sign in successfull, here is your token",
      data: {
        token: jwt.sign(user.toJSON(), "codial", { expiresIn: "1000000" }),
      },
    });
  } catch (error) {
    console.log("there was some error", error);
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};
