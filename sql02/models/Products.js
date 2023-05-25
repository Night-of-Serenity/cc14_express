// require("dotenv").config();
const mysql = require("mysql2/promise");
const pool = mysql.createPool(process.env.DB_CONNECT);

exports.findAll = () => {
  let sql = "SELECT * FROM products";
  return pool.query(sql).then(([rows]) => rows);
};

exports.findId = (id) => {
  let sql = "SELECT * FROM products WHERE id = ?";
  return pool.execute(sql, [id]).then(([rows]) => rows);
};

exports.createId = (product) => {
  let { name, price, quantity, category_id } = product;
  let sql = "INSERT INTO products (name,price,quantity,category_id) VALUES (?,?,?,?)";
  return pool.execute(sql, [name, price, quantity, category_id]).then(([rows]) => rows);
};

exports.deleteId = (id) => {
  let sql = "DELETE FROM products WHERE id = ?";
  return pool.execute(sql, [id]).then(([rows]) => rows);
};

exports.updateId = (id, product) => {
  let { name, price, quantity, category_id } = product;
  let sql = "UPDATE products SET name=?,price=?,quantity=?,category_id=? WHERE id = ?";
  return pool.execute(sql, [name, price, quantity, category_id, id]).then(([rows]) => rows);
};

exports.findByName = (name) => {
  let sql = "SELECT * FROM products WHERE name LIKE ?";
  return pool.execute(sql, [`\%${name}\%`]).then(([rows]) => rows);
};
