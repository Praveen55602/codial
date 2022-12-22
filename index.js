const express = require("express");
const app = express();
const port = 8000;

//setting up view engine
app.set("view engine", "ejs");
app.set("views", "./views");

//use express router using this middleware
// all routes staring from home will go to homeRoute.js file to access any sub routes from there

app.use("/", require("./routes/homeRoutes"));

app.listen(port, (err) => {
  if (err) {
    console.log("some error occurred");
    return;
  }

  console.log("successfully connected to port ", port);
});
