const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const port = 8000;
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-storage");
const MongoStore = require("connect-mongo");

app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static("./assets"));
app.use(expressLayouts);

// extract style and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//setting up view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// order of all app.use are important don't mess it up
// mongo store is used to store the session cookies in the db so that whenever the server restarts the logged in users don't get logged out
app.use(
  session({
    name: "codial", // name of cookie
    //todo change the secret before deploying to the production
    secret: "blahsomething", // this key will be use to encrypt the cookie value
    saveUninitialized: false, // do not store any data in the sesssion cookie when the user is not logged in
    resave: false, // do not rewrite the session cookie again and again after the user is logged in
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/CodielDevelopment",
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthUser);
app.use("/", require("./routes/homeRoutes"));

//use express router using this middleware
// all routes staring from home will go to homeRoute.js file to access any sub routes from there

app.listen(port, (err) => {
  if (err) {
    console.log("some error occurred");
    return;
  }

  console.log("successfully connected to port ", port);
});
