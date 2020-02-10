const mUsers = require("../models_/users");
const vUsers = require("../validators/users");
var validator = require("node-input-validator");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const config = require("../config/index.js");
// const randomstring = require("randomstring");
// const sgMail = require("@sendgrid/mail");

// register - validator //

// const register = (req, res) => {
//     var v = new validator.Validator(req.body, vUsers.createUser);
//     v.check()
//     .then(matched => {
//         if(matched) {
//             return mUsers.createUser(req.body)
//         } else {
//             throw new Error('Validation failed');
//         }
//     })
//     .then(() => {
//         return res.status(201).send('ok - registration is created');
//     })
//     .catch(err => {
//         console.log(err);
//         return res.status(500).send(v.errors);
//     });
// }

// UGLAV!!! 01-20-2020 //
// hashing so confirm mail sG//
// DP //
// const register = (req, res) => {
//   var validate = new validator.Validator(req.body, vUsers.createUser);
//   validate.check()
//     .then(matched => {
//       if (matched) {
//         // get user by email
//         return mUsers
//           .getUserPasswordByEmail(req.body.email)
//           .then(ed => {
//             console.log(ed);
//             if (!ed) {
//               bcrypt.genSalt(10, function(err, salt) {
//                 if (err) {
//                   throw new Error(err);
//                   return;
//                 }
//                 bcrypt.hash(req.body.password, salt, function(err, hash) {
//                   if (err) {
//                     throw new Error(err);
//                     return;
//                   }
//                   //   var confirm_hash = randomstring.generate({
//                   //     length: 30,
//                   //     charset: "alphanumeric"
//                   //   });
//                   return mUsers.createUser({
//                     ...req.body,
//                     password: hash
//                     // confirm_hash: confirm_hash,
//                     // confirmed: false
//                   });
//                   //   sgMail.setApiKey(config.getConfig("mailer").key);
//                   //   const msg = {
//                   //     to: req.body.email,
//                   //     from: "designcrafts.mk@gmail.com",
//                   //     subject: "Thanks for registering",
//                   //     text: "Thanks for registering",
//                   //     html: `<a href="http://localhost:8081/api/v1/confirm/${confirm_hash}">Click here to confirm your account</a>`
//                   //   };
//                   //   sgMail.send(msg);
//                   //   return;
//                 });
//               });
//             } else {
//               throw new Error("Bad Request - User Exists");
//             }
//           })
//           .catch(err => {
//             throw new Error(err);
//           });
//       } else {
//         throw new Error("Validation failed");
//       }
//     })
//     .then(() => {
//       return res.status(201).send("ok-new user is registered/created");
//     })
//     .catch(err => {
//       console.log(err);
//       return res.status(500).send(validate.errors);
//     });
// };

const register = (req, res) => {
  var validate = new validator.Validator(req.body, vUsers.createUser);
  validate
    .check()
    .then(matched => {
      if (matched) {
        bcrypt.genSalt(10, function(err, salt) {
          if (err) {
            throw new Error(err);
            return;
          }
          bcrypt.hash(req.body.password, salt, function(err, hash) {
            if (err) {
              throw new Error(err);
              return;
            }
            return mUsers.createUser({ ...req.body, password: hash });
          });
          // console.log(...req.body);
        });
      } else {
        throw new Error("Validation failed!");
      }
    })
    .then(() => {
      return res.status(201).send("ok-User is Registered");
    })
    .catch(err => {
      console.log(err);
      return res.status(500).send(validate.errors);
    });
};

// const login = (req, res) => {
//   mUsers
//     .getUserPasswordByEmail(req.body.email)
//     .then(data => {
//       bcrypt.compare(req.body.password, data.password, function(err, rez) {
//         if (err) {
//           return res.status(500).send("Could not compare password");
//         }
//         if (rez) {
//           var tokenData = {
//             id: data._id,
//             full_name: `${data.first_name} ${data.last_name}`,
//             email: data.email
//             // exp:
//           };
//           var token = jwt.sign(tokenData, config.getConfig("jwt").key);
//           return res.status(200).send({
//             jwt: token,
//             first_name: data.first_name,
//             last_name: data.last_name
//           });
//         }
//         return res.status(404).send("not found");
//       });
//     })
//     .catch(err => {
//       console.log(err);
//       return res.status(500).send("Could not get user");
//     });
// };

const login = (req, res) => {
  mUsers
    .getUserPasswordByEmail(req.body.email)
    .then(data => {
      bcrypt.compare(req.body.password, data.password, (err, rez) => {
        if (err) {
          return res.status(500).send("Could not compare passwords");
        }
        if (rez) {
          var tokenData = {
            id: data._id,
            full_name: `${data.first_name} ${data.last_name}`,
            email: data.email
          };
          var token = jwt.sign(tokenData, config.getConfig("jwt").key);
          return res.status(200).send({
            jwt: token,
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            id: data._id
          });
        }
        return res.status(400).send("not found - PROBLEM!");
      });
    })
    .catch(err => {
      return res.status(500).send("Could not get user");
    });
};

const confirm = (req, res) => {
  var hash = req.params.confirm_hash;
  mUsers
    .confirmUserAccount(hash)
    .then(() => {
      return res.status(200).send("ok");
    })
    .catch(err => {
      return res.status(500).send("internal Server Error");
    });
};

const getOne = (req, res) => {
  mUsers
    .getOne(req.params.id /*req.user.id*/)
    .then(data => {
      res.status(200).send(data);
      // console.log(data);
      console.log("User-getOne - req.params.id", req.params.id);
    })
    .catch(err => {
      res.status(500).send(err);
      console.log(err);
    });
};

const replaceUser = (req, res) => {
  var data = req.body;
  let er = 0;
  if (data.first_name == undefined || data.first_name.length == 0) {
    er++;
  }
  if (data.last_name == undefined || data.last_name.length == 0) {
    er++;
  }
  if (data.email == undefined || data.email.length == 0) {
    er++;
  }
  // if (data.password == undefined || data.password.length == 0) {
  //   er++;
  // }
  if (data.date_of_birth == undefined || data.date_of_birth.length == 0) {
    er++;
  }
  if (data.telephone == undefined || data.telephone.length == 0) {
    er++;
  }
  if (data.country == undefined || data.country.length == 0) {
    er++;
  }

  if (er == 0) {
    mUsers
      .replaceUser(req.params.id, data)
      .then(() => {
        res.status(204).send();
        console.log("User-req.params.id", req.params.id);
        console.log(data);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  } else {
    res.status(400).send("Replace - Bad request");
  }
};

const removeUser = (req, res) => {
  mUsers
    .remove(req.params.id)
    .then(() => {
      res.status(204).send();
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

const renew = (req, res) => {
  return res.status(200).send(req.user);
  // return res.status(200).send('ok');
};

const resetLink = (req, res) => {
  return res.status(200).send("ok");
};

const resetPassword = (req, res) => {
  return res.status(200).send("ok");
};

const changePassword = (req, res) => {
  return res.status(200).send("ok");
};

module.exports = {
  register,
  login,
  getOne,
  replaceUser,
  removeUser,
  renew,
  resetLink,
  resetPassword,
  changePassword,
  confirm
};
