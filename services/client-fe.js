const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const api = express();

api.use(cors());
api.use(bodyParser.json());

// Serve build version-static files from the React app
api.use(express.static(path.join(__dirname, "../clien-fe/build")));

api.get("/*", function(req, res) {
  console.log("Client app");
  console.log("Path", path.join(__dirname, "../clien-fe/build", "index.html"));
  res.sendFile(path.join(__dirname, "../clien-fe/build", "index.html"));
});

api.listen(8083, err => {
  if (err) {
    console.log("could not start server");
    console.log(err);
    return;
  }
  console.log("Front end server started successfully on port 8083!");
});
