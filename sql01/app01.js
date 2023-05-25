const mysql2 = require("mysql2/promise");
require("dotenv").config();

// const dbInfo = {
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// };
// const connection = mysql2
//   .createConnection(dbInfo)
//   .then((db) => db.query("SELECT * FROM products"))
//   .then((result) => console.log(result));

// mysql://root:password@localhost:port/dbName
const dbInfo = process.env.DB_CONNECT;

const conn = mysql2.createConnection(dbInfo);

// conn.then((db) => db.query("SELECT * FROM products").then((result) => console.log(result[0])));

// conn.then((db) => db.query("SELECT * FROM products").then(([rows]) => console.log(rows[0].id)));

// console.log แสดง product พร้อม category_name
let sql_query1 =
  "SELECT products.name product_name, categories.name category_name FROM products JOIN categories ON products.category_id = categories.id";
conn.then((db) => db.query(sql_query1)).then(([rows]) => console.log(rows));

// console.log แสดงมูลค่ารวมของ products ทั้งหมด
let sql_query2 = "SELECT SUM(price * quantity) total_price FROM products";
conn.then((db) => db.query(sql_query2)).then(([rows]) => console.log(rows[0]));
