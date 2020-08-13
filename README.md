## E-commerce_app

[![GitHub license](https://img.shields.io/github/license/A1dricAP/E-commerce_app)](https://github.com/A1dricAP/E-commerce_app/blob/master/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/A1dricAP/E-commerce_app)](https://github.com/A1dricAP/E-commerce_app/issues)

This Readme is for the backend of the project.

Following are main dependencies:

<img src="https://img.shields.io/badge/express-v4.17.1-<COLOR>">

`Express` is used as the server; it is the main part of the app.

<img src="https://img.shields.io/badge/mongoose-v5.9.22-<COLOR>">

`Mongoose` is used to communicate with the database.

---

<img src="https://img.shields.io/badge/MongoDB-v4.2.8-blue">

MongoDB is a NoSql Database. Most preferred Db for me.

`mongoose` is used to communicate with the database.

---

<img src="https://img.shields.io/badge/cors-v2.8.5-blue">

cors is used to get past cross origin error.

---

#### _Always check for spelling errors, it may be a pain in the ass that because of some silly mistakes, one whole function or middleware might not work!_

Always run the front-end, React app with the following command, after entering into the client directory.

> npm start

Always run the server with the follwoing command, after entering into the server directory:

> npm start

---

## **Database**

Along with the server, mongoDB connection also needs to be made and started, with the following command:

> mongod --config /usr/local/etc/mongod.conf

To view the database, run the following command in another terminal

> mongo

The database for this project is called `ecommerce`. on initialising the database, use the following command,

> use ecommerce

ecommerce database has the following collections;

1. users
2. category
3. products

---

## **APP**

The app consists of the main `app.js` file, it also includes other files,

1. controller file

   - `auth.js`
   - `category.js`
   - `product.js`
   - `user.js`

1. models
   - `category.js`
   - `product.js`
   - `user.js`
1. routes
   - `auth.js`
   - `category.js`
   - `product.js`
   - `user.js`

`app.js` is like the main face of the entire app; that takes care of all the routing in the website.

`models` is a file that is used for creating different models for _category_, _product_, _user_, to be put into the database [mongodb].

`controller` is a file that takes care of creating all the middlewares for the app. Consists of middlewares for _auth_, _category_, _product_ and _user_.

- the middlewares created in the controller file needs to be exported first, inorder to use it in another file. In the following way:

```javascript
exports.(middleware_name)=(req,res)=>{
    //body of code.(middleware)
}
```

`router` is a file that consists of the routing to be done in the app. Consists of routes for _auth_, _category_, _product_, _user_.

- the middlewares from the controller files need to imported first, inorder to place the middleware in the routes. In the following way:

```javascript
import {middleware_name} = require("name_of_file_to_import_from")
```

- after creating a router app, the router object needs to be exported. in the following way:

```
module.exports = router;
```

---

### Few notes

- For admin and auth routing, correct id and token is required to be filled in postman.

- [signout] may/may not be working rn along with [requireSignin] function, because admin and auth priviledges can still be attained, after signing out user.

- And [requireSignin] function doesn't seem to be working, because it directly prints {"hello"} message even after signing out user. _in short, [signout] may not be working, or some complex confusion exists._

---

**E-commerce app following Ryan D**

## **ROAD MAP**

[✅] 1] API _(Building the API with Node.JS)_

[✅] 2] Project setup _(Setting up the project)_

[✅] 3] Database Setup _(Connecting with the database[MongoDB])_

[✅] 4] User Signup

[✅] 5] Validation

[✅] 6] User signin using JWT _(Signing in user after validation is completed; based on [JSON_Web_Token])_

[✅] 7] Auth/Admin middleware _(Creating middleware, to check whether the user is authenticated or whether the user is an Admin)_

[✅] 8] Categories - create _(creating a category for the products)_

[✅] 9] products - CRUD

[✅] 10] Products - by arrival, sold, search _(All these types will be coming from front end client as a [route_parameter])_

---

## **REACT CLIENT**

[ ] 1] setup

[ ] 2] Routing/ menu

[ ] 3] signin/signup

[ ] 4] admin route/ private route _(two separate routes-> [admin]and [private])_

[ ] 5] user / admin dashboard _(two separate dashboards, [user] and [admin])_

[ ] 6] create category

[ ] 7] create product

[ ] 8] products by sell

[ ] 9] products by arrivals

[ ] 10] shop page with filter products by [categories/price]

[ ] 11] filter products based on categories using checkbox

[ ] 11] filter products based on price using radio buttons

[ ] 12] search products with option of category

[ ] 13] single product view _(single product to be shown)_

[ ] 14] single product view with related products sidebar _(single product view, with related products on the side bar like [Amazon])_

[ ] 15] cart page

[ ] 16] add product to cart

[ ] 17] product increment and decrement _(to increase or decrease the number of products in the cart)_

[ ] 18] remove product from cart

[ ] 19] show total

[ ] 20] payment integration using brintree _(brintree is a PayPal company, which makes it easy to integrate payment method)_

[ ] 21] checkout _(checkout after successful completion of payment)_

---

## **Backend/ Frontend**

**_alternating between backend and frontend_**

[ ] 1] API - processing payment

[ ] 2] REACT - processing payment with brintree dropin UI

[ ] 3] delivery address

[ ] 4] finalise payment

[ ] 5] send order details to backend

[ ] 6] saving orders

[ ] 7] sold products count/ update after selling

[ ] 8] view all orders

[ ] 9] order status update (_status update such as processing/delivered_)

[ ] 10] profile update

[ ] 11] product update (_any updates to be done by admin_)

[ ] 12] deployment

# **DONE []**
