const express = require("express");
const router = express.Router(); //Router() needs to be invoked

const name = "AP";
router.get("/", (req, res) => {
  res.send(`Hello from user.js ${name}`);
});

module.exports = router;
