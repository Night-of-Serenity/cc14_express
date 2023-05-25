require("dotenv").config();
const express = require("express");
// const mysql = require("mysql2/promise");
const productsRoute = require("./routes/productsRoute");
const categoryRoute = require("./routes/categoryRoute");
const notFound = require("./middlewares/notFound");
const errorHdl = require("./middlewares/error");
const app = express();

app.use(express.json());
app.use(["/products", "/product"], productsRoute);
app.use("/category", categoryRoute);

// not found
app.use(notFound);

// error
app.use(errorHdl);

let port = process.env.PORT || 8000;
app.listen(port, () => console.log("Server on port", port));
