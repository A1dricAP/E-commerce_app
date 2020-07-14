/*
this file takes in the {userById} function, imported from [../controller/user] 
and also the {requireSignin} function, imported from [../controller/auth].
the main task of this file is, to deliver the users profile, defined in the userById function; and take in a custom 
id no. with the help of the router.param method
*/

const express = require("express");
const router = express.Router(); //Router() needs to be invoked. [Creating a router object]

//getting the export function from "../controller/user" directory in the project
const { userById } = require("../controller/user");

const { requireSignin, isAuth, isAdmin } = require("../controller/auth");

router.get("/secret/:userId", requireSignin, isAuth, isAdmin, (req, res) => {
  res.json({
    message: req.profile,
  });
});

router.param("userId", userById); //anytime there is "userId" in the route parameter, userById will run.

/************************************************************************************************************************/

module.exports = router;
