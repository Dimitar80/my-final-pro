const mongoose = require("mongoose");

const Product = mongoose.model(
  "products",
  new mongoose.Schema({
    productName: String,
    productType: String,
    productDescription: String,
    purchaseDate: Date,
    productPrice: Number,
    user_id: String,
    _created: Date,
    _modified: Date
  })
);

const getAll = (q, sort) => {
  return new Promise((success, fail) => {
    // console.log("In find: ", sort);
    // Product.find(/*q,*/ {}, null, { sort: sort }, (err, data) => {
    Product.find(
      /*{user_id: userID},*/ /*{},*/ q,
      {},
      { sort: sort },
      (err, data) => {
        if (err) {
          // console.log(err)
          return fail(err);
        }
        return success(data);
      }
    );
  });
};

const getOne = (id, userID) => {
  return new Promise((success, fail) => {
    Product.find({ _id: id, user_id: userID }, (err, data) => {
      if (err) {
        return fail(err);
      }
      return success(data);
    });
  });
};

const save = data => {
  return new Promise((success, fail) => {
    var p = new Product(data);
    p.save(data, err => {
      if (err) {
        return fail(err);
      }
      return success();
    });
  });
};

const replace = (id, data) => {
  return new Promise((success, fail) => {
    Product.findByIdAndUpdate(id, data, err => {
      console.log("Product models - row 62", id);
      if (err) {
        return fail(err);
      }
      return success();
    });
  });
};

const update = (id, data) => {
  return new Promise((success, fail) => {
    Product.findByIdAndUpdate(id, { $set: { data } }, err => {
      if (err) {
        return fail(err);
      }
      return success();
    });
  });
};

const remove = id => {
  return new Promise((success, fail) => {
    Product.findByIdAndRemove(id, err => {
      if (err) {
        return fail(err);
      }
      return success();
    });
  });
};

const removeMany = user_id => {
  return new Promise((success, fail) => {
    Product.deleteMany({ user_id: user_id }, err => {
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
  remove,
  removeMany
};
