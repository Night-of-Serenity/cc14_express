require("dotenv").config();
const { notFound } = require("./middlewares/notFound");
const express = require("express");
const app = express();

const todo = [
  { id: 1, title: "HTML" },
  { id: 2, title: "CSS" },
  { id: 3, title: "Javascript" },
];

// ==> /todo?title=javascript
//res.send
//{id: 33, title: 'Javascript}
app.get("/todo", (req, res) => {
  const { title } = req.query;
  console.log(Object.keys(req.query).length);
  const foundItem = todo.find((item) =>
    item.title.toLocaleLowerCase().includes(title?.toLocaleLowerCase())
  );
  Object.keys(req.query).length === 0 ? res.send(todo) : res.send(foundItem || "not found");
});

app.get("/todo/:id", (req, res) => {
  const foundItem = todo.find((item) => item.id === +req.params.id);
  res.send(foundItem ? foundItem : "your request item is not found");
});

app.use(express.json());

app.post("/todo", (req, res) => {
  const { id, title } = req.body;
  todo.push({ id, title });
  console.log(todo);
  res.send(todo);
});

// not found middleware
app.use(notFound);

const port = process.env.PORT || 8000;
console.log(port);
app.listen(port, () => {
  console.log(`Server on ${port}`);
});
