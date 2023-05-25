require("dotenv").config();
const express = require("express");
const mysql = require("mysql2/promise");

const app = express();

const pool = mysql.createPool(process.env.DB_CONNECT);

// pool.query("SELECT * FROM products").then(([rows]) => console.log(rows));

app.get("/products", (req, res, next) => {
  pool
    .query("SELECT * FROM products")
    .then(([rows]) => res.json(rows))
    .catch(next);
});

app.get("/product/:id", (req, res, next) => {
  const { id } = req.params;
  //   pool
  //     .query(`SELECT * FROM products WHERE id=${id}`) // SQL injection risk warning
  //     .then(([rows]) => {
  //       res.json(rows);
  //     })
  //     .catch(next);
  pool
    .execute("SELECT * FROM products WHERE id = ?", [id])
    .then(([rows]) => {
      res.json(rows);
    })
    .catch(next);
});
app.use((req, res) => {
  res.status(404).json({ msg: "[path not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ err: err.message });
});

let port = process.env.PORT || 8000;
app.listen(port, () => console.log("Server on", port));
