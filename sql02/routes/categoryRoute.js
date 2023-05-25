const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  console.log("run category");
  res.json({ msg: "run category" });
});

module.exports = router;
