/*
the main task of this file is, to create a {userByid} function and supply it to the user.js file in [../routes/user]
{userById} function checks for the valid user. if there is no valid user, it returns an error.
*/

const User = require("../models/user");

/******************************************************************************************************************************/

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    //to find the user by id number, and execute the preceeding function defined.
    if (err || !user) {
      return res.status(404).json({
        error: "user not found man",
      });
    }

    req.profile = user; //setting the req.profile to the user json object, to show it via user.js file in [../routes/user]
    next(); //because this is a middleware, we've to use next(), so that control flow applies to next function.
  });
};

/******************************************************************************************************************************/

exports.read = (req, res) => {
  //setting the hashed_password & salt to undefined, so that these params dont appear.
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

/******************************************************************************************************************************/

// this middleware is used for user to update; whatever field the user wants to update.

exports.update = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "You are not authorized to perform this action.",
        });
      }
      user.hashed_password = undefined;
      user.salt = undefined;
      res.json(user);
    }
  );
};

/******************************************************************************************************************************/
