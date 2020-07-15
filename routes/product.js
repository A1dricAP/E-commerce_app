/*
this file takes care of the routing on the page. the data submitted into this page, 
will be sent to the controller [/controller.user]

*/

const express = require("express");
const router = express.Router(); //Router() needs to be invoked. [Creating a router object]

//getting the export functions from "../controller/product" directory in the project
const { create, productById, read, remove } = require("../controller/product");
//and "../controller/auth"
const { requireSignin, isAuth, isAdmin } = require("../controller/auth");
//and also "../controller/user"
const { userById } = require("../controller/user");

//using the different functions from the imported files. [../controller/user,auth,category]
router.post("/product/create/:userId", requireSignin, isAdmin, isAuth, create);

//using the fucntion from the imported files. [../controller/product]
router.get("/product/:productId", read);

//using the functions [called middlewares] from the imported files. [../controller/product]
router.delete(
  "/product/:productId/:userId",
  requireSignin,
  isAdmin,
  isAuth,
  remove
);

router.param("userId", userById); //anytime there is "userId" in the route parameter, userById will run.
router.param("productId", productById); //anytime there is "userId" in the route parameter, userById will run.
/************************************************************************************************************************/

module.exports = router;
