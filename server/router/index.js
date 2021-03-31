const express = require("express");
const router = express.Router();
const auth = require("./auth");

router.get("/home", (req, res) => {
  return res.send("This is the home");
});

router.use("/", auth);

module.exports = router;
