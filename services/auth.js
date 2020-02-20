const express = require("express");
const bodyParser = require("body-parser");
var jwt = require("express-jwt");
const config = require("../config/index.js");
const db = require("../db/connection");
const auth = require("../handlers/auth");
const path = require("path");
const cors = require("cors");

db.init(config.getConfig("db"));

var api = express();
// //////////////////////////
// only for testing purposes
// //////////////////////////
var pub = path.join(__dirname, "..", "public");
api.use("/public", express.static(pub));
// //////////////////////////
// only for testing purposes
// //////////////////////////
api.use(bodyParser.json());
api.use(cors());
// api.use(
//   jwt({ secret: config.getConfig("jwt").key }).unless({
//     path: ["/api/v1/register", "/api/v1/login", "/public", "/api/v1/confirm"]
//   })
// );

api.use(
  jwt({
    secret: config.getConfig("jwt").key
  }).unless({
    path: [
      "/api/v1/auth/register",
      "/api/v1/auth/login",
      "/api/v1/auth/userslist"
    ]
  })
);

//api.post za saveNewUser//
api.post("/api/v1/auth/register", auth.register);
api.post("/api/v1/auth/confirm/:confirm_hash", auth.confirm);
api.post("/api/v1/auth/login", auth.login);
api.get("/api/v1/auth/userslist", auth.getAllUsersList);
api.get("/api/v1/auth/:id", auth.getOne);
api.put("/api/v1/auth/:id", auth.replaceUser);
api.delete("/api/v1/auth/:id", auth.removeUser);
api.get("/api/v1/auth/renew", auth.renew);
api.post("/api/v1/auth/reset-link", auth.resetLink);
api.post("/api/v1/auth/reset-password", auth.resetPassword);
api.post("/api/v1/auth/change-password", auth.changePassword);

api.use(function(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).send({ message: "Invalid token" });
  } else {
    next(err);
  }
});

api.listen(8081, err => {
  if (err) {
    console.log("Could not start server");
    console.log(err);
    return;
  }
  console.log("Server started on port 8081");
});
