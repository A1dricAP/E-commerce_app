/*
this file takes care of the routing on the page. the data submitted into this page, 
will be sent to the controller [/controller.user]

*/

const express = require("express");
const router = express.Router(); //Router() needs to be invoked. [Creating a router object]

//getting the middlewares from "../controller/category" directory in the project
const {
  create,
  categoryById,
  read,
  update,
  remove,
  list,
} = require("../controller/category");
//and "../controller/auth"
const { requireSignin, isAuth, isAdmin } = require("../controller/auth");
//and also "../controller/user"
const { userById } = require("../controller/user");

//route for reading the category. Part of the CRUD function.
router.get("/category/:categoryId", read);

//using the different functions from the imported files. [../controller/user,auth,category]
router.post("/category/create/:userId", requireSignin, isAdmin, isAuth, create);
router.put(
  "/category/:categoryId/:userId",
  requireSignin,
  isAdmin,
  isAuth,
  update
);
router.delete(
  "/category/:categoryId/:userId",
  requireSignin,
  isAdmin,
  isAuth,
  remove
);
router.get("/categories", list);

router.param("userId", userById); //anytime there is "userId" in the route parameter, userById will run.
router.param("categoryId", categoryById); //anytime there is "categoryId" in the route parameter, userById will run.
/************************************************************************************************************************/

module.exports = router;
