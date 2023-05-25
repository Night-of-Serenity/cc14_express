const Products = require("../models/Products");
// const mysql = require("mysql2/promise");
// const pool = mysql.createPool(process.env.DB_CONNECT);
exports.getAllProducts = (req, res, next) => {
  let { name } = req.query;
  if (name) {
    Products.findByName(name)
      .then((rows) => {
        res.json(rows);
      })
      .catch(next);
  } else {
    Products.findAll()
      .then((rows) => {
        res.json(rows);
      })
      .catch(next);
  }
};

exports.getProductById = (req, res, next) => {
  Products.findId(req.params.id)
    .then((rows) => {
      res.json(rows);
    })
    .catch(next);
};

exports.createProduct = (req, res, next) => {
  Products.createId(req.body)
    .then((rows) => {
      console.log(rows);
      if (rows.affectedRows >= 1) {
        res.status(201).json(rows);
      }
    })
    .catch(next);
};

exports.deleteProduct = (req, res, next) => {
  let { id } = req.params;
  Products.deleteId(id)
    .then((rows) => {
      if (rows.affectedRows >= 1) res.status(204).send();
      else {
        let c_err = new Error(`cannot delete id : ${id}`);
        c_err.statusCode = 404;
        throw c_err;
      }
    })
    .catch(next);
};

exports.updateProduct = (req, res, next) => {
  let { id } = req.params;
  Products.updateId(id, req.body)
    .then((rows) => {
      console.log(rows);
      if (rows.affectedRows >= 1) res.send(rows);
      else throw new Error(`cannot update id : ${id}`);
    })
    .catch(next);
};

// exports.searchProduct = (req, res, next) => {
//   let { name } = req.query;
//   console.log("search");
//   Products.searchId(name)
//     .then((rows) => {
//       res.json(rows);
//     })
//     .catch(next);
// };
