/*
this file takes care of the routing on the page. the data submitted into this page, 
will be sent to the controller [/controller.user]

*/

const express = require("express");
const router = express.Router(); //Router() needs to be invoked. [Creating a router object]

//getting the export function from "../controller/user" directory in the project
const {
  signup,
  signin,
  signout,
  requireSignin,
} = require("../controller/auth");

//getting the export function from "../validator/index" directory in the project
const { userSignupValidator } = require("../validator/index");

//using the signup function from the imported file. [../controller/user]
router.post("/signup", userSignupValidator, signup);
//first running the user sign up validation, only then it'll go to the next field, that is actually signing up the user

//using the signin function from the imported file. [../controller/user]
router.post("/signin", signin);

//using the signout function from the imported file. [../controller/user]
router.get("/signout", signout);

router.get("/hello", requireSignin, (req, res) => {
  try {
    res.send("Done.");
  } catch (err) {
    res.send("error" + err);
  }
});
/************************************************************************************************************************/

module.exports = router;
