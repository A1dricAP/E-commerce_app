const express = require("express");
const router = express.Router(); //Router() needs to be invoked

router.get("/", (req, res) => {
  res.send("Hello from user.js");
});

module.exports = router;
