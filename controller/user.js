/*
this file takes care of the data recieved from the routes file. the job of this file till now is to add the data into the database.
and also to create a standard for the imput of the user, by importing the schema from [/models/user]
*/

const User = require("../models/user");

exports.signup = (req, res) => {
  console.log(req.body);
  const user = new User(req.body); //getting the body of the input from [/models/user] with [req.body]

  //saving into database (user)
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err,
      });
    }
    res.json({
      user,
    });
  });
};
