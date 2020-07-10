const express = require("express");
const router = express.Router(); //Router() needs to be invoked. [Creating a router object]

//getting the export function from "controller/user" directory in the project
const { signup } = require("../controller/user");

//using the sayHi function from the imported file. [controller/user]
router.post("/signup", signup);

module.exports = router;
