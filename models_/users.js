var mongoose = require("mongoose");

//Models// --PROVERKA za data Types?
const User = mongoose.model(
  "users",
  new mongoose.Schema(
    {
      first_name: String,
      last_name: String,
      email: String,
      password: String,
      date_of_birth: Date,
      telephone: String,
      country: String,
      _created: Date,
      _modified: Date,
      confirm_hash: String,
      confirmed: Boolean
    } /*,
    {
        collection: 'user'
    }*/
  )
);

// UGLAV!!! 01-20-2020 //
const createUser = data => {
  return new Promise((success, fail) => {
    var user = new User(data);
    user.save(
      /*data,*/ err => {
        if (err) {
          return fail(err);
        }
        return success();
      }
    );
  });
};

const getUserPasswordByEmail = email => {
  return new Promise((success, fail) => {
    // 1 ili 0 - true ili false//
    User.find(
      { email: email },
      { password: 1, email: 1, first_name: 1, last_name: 1 },
      (err, data) => {
        if (err) {
          return fail(err);
        }
        return success(data[0]); //celiot "Prv" objekt od baza//
      }
    );
  });
};

const getOne = (id /*userID*/) => {
  return new Promise((success, fail) => {
    User.find({ _id: id /*user_id: userID*/ }, (err, data) => {
      if (err) {
        return fail(err);
      }
      return success(data);
    });
  });
};

const replaceUser = (id, data) => {
  return new Promise((success, fail) => {
    User.findByIdAndUpdate(id, data, err => {
      console.log(" User models - row 71", id);
      if (err) {
        return fail(err);
      }
      return success();
    });
  });
};

const remove = id => {
  return new Promise((success, fail) => {
    User.findByIdAndRemove(id, err => {
      if (err) {
        return fail(err);
      }
      return success();
    });
  });
};

// const login = (email) => {
//     return new Promise((success,fail) => {
//         User.find({email: email}, (err,data) => {
//             if(err) {
//                 console.log(err);
//                 return fail(err);
//             }
//             return success(data[0])
//         })
//     })
// }

const confirmUserAccount = hash => {
  return new Promise((success, fail) => {
    User.update({ confirm_hash: hash }, { confirmed: true }, err => {
      if (err) {
        return fail(err);
      }
      return success();
    });
  });
};

module.exports = {
  createUser,
  getUserPasswordByEmail,
  getOne,
  remove,
  replaceUser,
  confirmUserAccount
};
