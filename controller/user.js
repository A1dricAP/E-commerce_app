/*
this file takes care of the data recieved from the routes file. the job of this file is to add 
the data into the database and also to create a standard for the input of the user, 
by importing the schema from [/models/user]
*/

const User = require("../models/user");

//importing json web token
const jwt = require("jsonwebtoken"); //to generate signed token

//importing express-jwt
const expressJwt = require("express-jwt"); //for authorization check

//name of errorHandler variable has to be same as the name in the [dbErrorHandler] script
const { errorHandler } = require("../helpers/dbErrorHandler");
const user = require("../models/user");

/************************************************************************************************************************/

//for user SignUp

exports.signup = (req, res) => {
  console.log(req.body);
  const user = new User(req.body); //getting the body of the input from [/models/user] with [req.body]

  //saving into database (user)
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: errorHandler(err),
      });
    }

    //hiding the salt and hashed password field
    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({
      user,
    });
  });
};

/************************************************************************************************************************/

//for user SignIn

exports.signin = (req, res) => {
  //find the user based on email.
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "user with that email does not exist!",
      });
    }

    //if user found, make sure email and password match.
    //created authenticate method in user model
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password not matched",
      });
    }

    //generate a signed token with user id and secret
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    //persist the token with name 't', with expiry date
    res.cookie("t", token, { expire: new Date() + 9999 });

    //return response with user and token to frontend client
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });
};

/************************************************************************************************************************/

//for user signout

exports.signout = (req, res) => {
  res.clearCookie("t");
  res.json({
    message: "Signout success",
  });
};
