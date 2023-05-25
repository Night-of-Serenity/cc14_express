const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ msg: "from /users" });
});

router.get("/someone", (req, res) => {
  res.send({ msg: "from /users/someone" });
});

module.exports = router;
