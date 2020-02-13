const express = require("express");
const bodyParser = require("body-parser");
const products = require("../handlers/products");
const jwt = require("express-jwt");

//making the connection with mongoose
const config = require("../config/index.js");
const DBConn = require("../db/connection");
DBConn.init(config.getConfig("db"));

const cors = require("cors");

const api = express();
api.use(bodyParser.json());
api.use(cors());
// api.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Credentials", "true");
//     res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
//     res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
//     next();
// });

api.use(
  //sekoj req ke pomine niz ova i ke vrati req.user
  jwt({
    secret: config.getConfig("jwt").key
  })
);

api.get("/api/v1/products/", products.getAll);
api.get("/api/v1/products/:id", products.getOne);
api.post("/api/v1/products/", products.save);
api.put("/api/v1/products/:id", products.replace);
api.patch("/api/v1/products/:id", products.update);
api.delete("/api/v1/products/:id", products.remove);
api.delete("/api/v1/products/user/:id", products.removeMany);

api.listen(8082, err => {
  if (err) {
    console.log("could not start server");
    console.log(err);
    return;
  }
  console.log("server started successfully on port 8082");
});
