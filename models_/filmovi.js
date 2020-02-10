const mongoose = require("mongoose");

const Film = mongoose.model(
  "film",
  new mongoose.Schema(
    {
      ime: String,
      godina: Date,
      zanr: [String],
      rezija: String,
      oscar: Boolean,
      akteri: [String],
      user_id: String
    },
    {
      collection: "filmovi"
    }
  )
);

// All methods //
// get method //
const getAll = (/*userID*/ q, sort) => {
  return new Promise((success, fail) => {
    console.log("In find: ", sort);
    Film.find(
      /*{user_id: userID},*/ /*{},*/ q,
      {},
      { sort: sort },
      (err, data) => {
        if (err) {
          return fail(err);
        }
        return success(data);
      }
    );
  });
};

// get method //
const getOne = (id, userID) => {
  return new Promise((success, fail) => {
    Film.find({ _id: id, user_id: userID }, (err, data) => {
      if (err) {
        return fail(err);
      }
      return success(data[0]);
    });
  });
};

// post method //
const save = data => {
  return new Promise((success, fail) => {
    var f = new Film(data);
    f.save(data, err => {
      if (err) {
        return fail(err);
      }
      return success();
    });
  });
};

// put method //
const replace = (id, data) => {
  return new Promise((success, fail) => {
    Film.updateOne({ _id: id }, data, err => {
      if (err) {
        return fail(err);
      }
      return success();
    });
  });
};

// patch method //
const update = (id, data) => {
  return new Promise((success, fail) => {
    Film.updateOne({ _id: id }, data, err => {
      if (err) {
        return fail(err);
      }
      return success();
    });
  });
};

// delete method //
const remove = id => {
  return new Promise((success, fail) => {
    Film.deleteOne({ _id: id }, err => {
      if (err) {
        return fail(err);
      }
      return success();
    });
  });
};

module.exports = {
  getAll,
  getOne,
  save,
  replace,
  update,
  remove
};
