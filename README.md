# E-commerce_app

[Google](www.google.com "Google")

1. first
1. second

```
 npm install

 npm downlaod

```

Always run the server with the follwoing command:

> npm start

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

### Few notes

- For admin and auth routing, correct id and token is required to be filled in postman.

- [signout] may/may not be working rn along with [requireSignin] function, because admin and auth priviledges can still be attained, after signing out user.

- And [requireSignin] function doesn't seem to be working, because it directly prints {"hello"} message even after signing out user. _in short, [signout] may not be working, or some complex confusion exists._

---

**E-commerce app following Ryan D**

## ROAD MAP

[✅] 1] API **Building the API with Node.JS**

[✅] 2] Project setup **Setting up the project**

[✅] 3] Database Setup **Connecting with the database[MongoDB]**

[✅] 4] User Signup

[✅] 5] Validation

[✅] 6] User signin using JWT **Signing in user after validation is completed; based on [JSON_Web_Token]**

[✅] 7] Auth/Admin middleware **Creating middleware, to check whether the user is authenticated or whether the user is an Admin**

[✅] 8] Categories - create **creating a category for the products**

[ ] 9] products - CRUD

[ ] 10] Products - by arrival, sold, search **All these types will be coming from front end client as a [route_parameter]**

---

## REACT CLIENT

[ ] 1] setup

[ ] 2] Routing/ menu

[ ] 3] signin/signup

[ ] 4] admin route/ private route **two separate routes-> [admin]and [private]**

[ ] 5] user / admin dashboard **two separate dashboards, [user] and [admin]**

[ ] 6] create category

[ ] 7] create product

[ ] 8] products by sell

[ ] 9] products by arrivals

[ ] 10] shop page with filter products by [categories/price]

[ ] 11] filter products based on categories using checkbox

[ ] 11] filter products based on price using radio buttons

[ ] 12] search products with option of category

[ ] 13] single product view **single product to be shown**

[ ] 14] single product view with related products sidebar **single product view, with related products on the side bar like [Amazon]**

[ ] 15] cart page

[ ] 16] add product to cart

[ ] 17] product increment and decrement **to increase or decrease the number of products in the cart**

[ ] 18] remove product from cart

[ ] 19] show total

[ ] 20] payment integration using brintree **brintree is a PayPal company, which makes it easy to integrate payment method**

[ ] 21] checkout **checkout after successful completion of payment**

---

## Backend/ Frontend

**alternating between backend and frontend**

[ ] 1] API - processing payment

[ ] 2] REACT - processing payment with brintree dropin UI

[ ] 3] delivery address

[ ] 4] finalise payment

[ ] 5] send order details to backend

[ ] 6] saving orders

[ ] 7] sold products count/ update after selling

[ ] 8] view all orders

[ ] 9] order status update **status update such as processing/delivered**

[ ] 10] profile update

[ ] 11] product update **any updates to be done by admin**

[ ] 12] deployment

# DONE []

```

```
