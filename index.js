const express = require("express");
const app = express();
const port = 8000;

app.listen(port, (err) => {
  if (err) {
    console.log("some error occurred");
    return;
  }

  console.log("successfully connected to port ", port);
});
