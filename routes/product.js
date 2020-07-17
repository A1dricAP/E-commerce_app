/*
this file takes care of the routing on the page. the data submitted into this page, 
will be sent to the controller [/controller.user]

*/

const express = require("express");
const router = express.Router(); //Router() needs to be invoked. [Creating a router object]

//getting the export functions from "../controller/product" directory in the project
const {
  create,
  productById,
  read,
  remove,
  update,
  list,
  listRelated,
  listCategories,
  listBySearch,
  photo,
} = require("../controller/product");
//and "../controller/auth"
const { requireSignin, isAuth, isAdmin } = require("../controller/auth");
//and also "../controller/user"
const { userById } = require("../controller/user");

/******************************************************************************************************************************/

//using the different functions from the imported files. [../controller/user,auth,category]
//to create a new product.
router.post("/product/create/:userId", requireSignin, isAdmin, isAuth, create);

/******************************************************************************************************************************/

//using the function from the imported files. [../controller/product]
//to get the product details.
router.get("/product/:productId", read);

/******************************************************************************************************************************/

//using the functions [called middlewares] from the imported files. [../controller/product]
//to delete the product.
router.delete(
  "/product/:productId/:userId",
  requireSignin,
  isAdmin,
  isAuth,
  remove
);

/******************************************************************************************************************************/

//using the functions [called middlewares] from the imported files. [../controller/product]
//using .put, which is used to update.
router.put(
  "/product/:productId/:userId",
  requireSignin,
  isAdmin,
  isAuth,
  update
);

/******************************************************************************************************************************/

// route to get all products.
router.get("/products", list);

// route to send all related products to the product Id.
router.get("/products/related/:productId", listRelated);

//
router.get("/products/categories", listCategories);

// using post, for the different parameters, so as to get the desired content.
router.post("/products/by/search", listBySearch);

// router to get the photo
router.get("/product/photo/:productId", photo);

/******************************************************************************************************************************/

router.param("userId", userById); //anytime there is "userId" in the route parameter, userById will run.
router.param("productId", productById); //anytime there is "userId" in the route parameter, userById will run.
/************************************************************************************************************************/

module.exports = router;
