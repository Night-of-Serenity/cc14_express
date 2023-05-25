const express = require("express");
require("dotenv").config();
const app = express();

app.use("*", (req, res, next) => {
  console.log(req.method);
  console.log("From first middleware", req.baseUrl);
  //   res.send("ok");
  next();
});

app.get("/", (req, res) => {
  res.send({ msg: "CC14" });
});

app.get("/date", (req, res) => {
  console.log(req.method);
  console.log(req.url);
  //   console.log(req);
  let current = new Date().toISOString();
  res.send(current);
});

app.use("/test", (req, res) => {
  console.log(req.method);
  console.log(req.url);
  console.log(req.baseUrl);
  //   console.log(req.params.id);

  res.send({ method: req.method, path: req.baseUrl });
});

app.get("/double/:num", (req, res) => {
  const { num } = req.params;
  console.log(num);
  res.send({ double: num * 2 });
});

// lab รับ /add/5/10
//res.send ==> {result: 15}
app.get("/add/:num/:num2", (req, res) => {
  const { num, num2 } = req.params;
  res.send({ result: +num + +num2 });
});

app.get("/test-query", (req, res) => {
  const { a, b } = req.query;
  console.log("a", a, "b", b);
  res.send(req.query);
});

app.use((req, res) => {
  res.status("404").send({ msg: "Path not found!" });
});

let port = process.env.PORT || 8080;
console.log(port);
app.listen(port, () => console.log("Server on ", port));
