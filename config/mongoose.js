const mongoose = require("mongoose");
const db = mongoose
  .connect("mongodb://127.0.0.1:27017/CodielDevelopment")
  .then(() => console.log("successfully connected to the database"))
  .catch((err) => console.log(err));

module.exports = db;
