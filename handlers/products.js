const mProducts = require("../models_/products");

// ZA SEGA FINISHING 13-01-2020 Comment Bez users-auth //
const getAll = (req, res) => {
  // console.log("getAll res", res);
  let q = { user_id: req.user.id };
  // console.log(req.query);
  // console.log(q);
  // let q = {};
  let sort = {};

  if (req.query.purcdate_from != undefined) {
    if (q.purchaseDate == undefined) {
      q.purchaseDate = {};
    }
    q.purchaseDate.$gte = new Date(Number(req.query.purcdate_from));
  }
  // console.log(q.purchaseDate);

  if (req.query.purcdate_to != undefined) {
    if (q.purchaseDate == undefined) {
      q.purchaseDate = {};
    }
    q.purchaseDate.$lte = new Date(Number(req.query.purcdate_to));
  }

  if (req.query.sort != undefined) {
    let sortable = ["purchaseDate", "productPrice"];
    let sq = req.query.sort.split(":");
    // console.log(sq);
    if (sortable.indexOf(sq[0]) > -1) {
      sort[sq[0]] = sq[1] == "desc" ? -1 : 1;
      // console.log(sort);
    }
  }
  mProducts
    .getAll(q, sort)
    .then(data => {
      res.status(200).send(data);
      // console.log(data);
    })
    .catch(err => {
      res.status(500).send(err);
      console.log(err);
    });
};

const getOne = (req, res) => {
  mProducts
    .getOne(req.params.id, req.user.id)
    .then(data => {
      res.status(200).send(data);
      console.log("Product handlers-row 52 - req.params.id", req.params.id);
      console.log("Product handlers-row 53 - req.user.id", req.user.id);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

const save = (req, res) => {
  var data = req.body;
  let er = 0;
  if (data.productName == undefined || data.productName.length == 0) {
    er++;
  }
  if (data.productType == undefined || data.productType.length == 0) {
    er++;
  }
  if (
    data.productDescription == undefined ||
    data.productDescription.length == 0
  ) {
    er++;
  }
  if (data.purchaseDate == undefined || data.purchaseDate.length == 0) {
    er++;
  }
  if (data.productPrice == undefined || data.productPrice.length == 0) {
    er++;
  }

  if (er == 0) {
    mProducts
      .save({ ...data, user_id: req.user.id })
      .then(() => {
        res.status(201).send("Data created successfully");
        // console.log(data)
      })
      .catch(err => {
        res.status(500).send(err);
      });
  } else {
    res.status(400).send("WTF-Bad request");
  }
};

const replace = (req, res) => {
  var data = req.body;
  let er = 0;
  if (data.productName == undefined || data.productName.length == 0) {
    er++;
  }
  if (data.productType == undefined || data.productType.length == 0) {
    er++;
  }
  if (
    data.productDescription == undefined ||
    data.productDescription.length == 0
  ) {
    er++;
  }
  if (data.purchaseDate == undefined || data.purchaseDate.length == 0) {
    er++;
  }
  if (data.productPrice == undefined || data.productPrice.length == 0) {
    er++;
  }

  if (er == 0) {
    mProducts
      .replace(req.params.id, data)
      .then(() => {
        res.status(204).send();
        console.log(req.params.id);
        // console.log(data)
      })
      .catch(err => {
        res.status(500).send(err);
      });
  } else {
    res.status(400).send("Replace - Bad request");
  }
};

const update = (req, res) => {
  var data = req.body;
  mProducts
    .replace(req.params.id, data)
    .then(() => {
      res.status(204).send();
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

const remove = (req, res) => {
  mProducts
    .remove(req.params.id)
    .then(() => {
      res.status(204).send();
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

const removeMany = (req, res) => {
  mProducts
    .removeMany(req.params.id)
    .then(() => {
      res.status(204).send();
    })
    .catch(err => {
      res.status(500).send(err);
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
