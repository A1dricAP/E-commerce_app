/*
this file takes care of the routing on the page. the data submitted into this page, 
will be sent to the controller [/controller.user]

*/

const express = require("express");
const router = express.Router(); //Router() needs to be invoked. [Creating a router object]

//getting the export function from "../controller/category" directory in the project
const { create } = require("../controller/category");
//and "../controller/auth"
const { requireSignin, isAuth, isAdmin } = require("../controller/auth");
//and also "../controller/user"
const { userById } = require("../controller/user");

//using the different functions from the imported files. [../controller/user,auth,category]
router.post("/category/create/:userId", requireSignin, isAdmin, isAuth, create);

router.param("userId", userById); //anytime there is "userId" in the route parameter, userById will run.
/************************************************************************************************************************/

module.exports = router;
