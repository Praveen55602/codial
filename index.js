const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const port = 8000;
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");

app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static("./assets"));
app.use("/", require("./routes/homeRoutes"));

app.use(expressLayouts);

// extract style and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//setting up view engine
app.set("view engine", "ejs");
app.set("views", "./views");

//use express router using this middleware
// all routes staring from home will go to homeRoute.js file to access any sub routes from there

app.listen(port, (err) => {
  if (err) {
    console.log("some error occurred");
    return;
  }

  console.log("successfully connected to port ", port);
});
