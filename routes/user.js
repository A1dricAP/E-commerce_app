/*
this file takes care of the routing on the page. the data submitted into this page, 
will be sent to the controller [/controller.user]

*/

const express = require("express");
const router = express.Router(); //Router() needs to be invoked. [Creating a router object]

//getting the export function from "../controller/user" directory in the project
const { signup, signin } = require("../controller/user");

//getting the export function from "../validator/index" directory in the project
const { userSignupValidator } = require("../validator/index");

//using the signup function from the imported file. [../controller/user]
router.post("/signup", userSignupValidator, signup);
//first running the user sign up validation, only then it'll go to the next field, that is actually signing up the user

router.post("/signin", signin);
module.exports = router;
