const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ msg: "from /todo" });
});

router.get("/all", (req, res) => {
  res.send({ msg: "from /todos/all" });
});

module.exports = router;
