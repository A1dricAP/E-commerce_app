/*
this file takes care of the routing on the page. the data submitted into this page, will be sent to the controller [/controller.user]

*/

const express = require("express");
const router = express.Router(); //Router() needs to be invoked. [Creating a router object]

//getting the export function from "../controller/user" directory in the project
const { signup } = require("../controller/user");

//using the signup function from the imported file. [../controller/user]
router.post("/signup", signup);

module.exports = router;
