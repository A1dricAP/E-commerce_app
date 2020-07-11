/*
the main task of this file till now, is to define the schema of the user details to be fed as data on the page, which is inserted 
into the database via the server
*/

const mongoose = require("mongoose");
const crypto = require("crypto"); //to hash the passwords generated
const { v1: uuidv1 } = require("uuid"); //to create unique id strings

//creating user schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },

    //for creating a hashed password
    hashed_password: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      trim: true,
    },
    salt: String,
    role: {
      type: Number,
      default: 0,
    },
    history: {
      type: Array,
      default: [],
    },
  },

  //getting timestamps for each entry
  { timestamps: true }
);

/************************************************************************************************************************************************/

// creating a virtual field
userSchema
  .virtual("password")

  //setting the password
  .set(function (password) {
    this._password = password;
    this.salt = uuidv1(); //creating a random string/ invoking the uuid package
    //will be used to hash the password
    this.hashed_password = this.encryptPassword(password); // (encryptPassword) method is creating in userSchema.methods
  })
  .get(function () {
    return this._password;
  });

//used to create methods for the userSchema
userSchema.methods = {
  //creating encryptPassword method

  encryptPassword: function (password) {
    if (!password) return " ";
    try {
      //createHmac is used to create an encrypted password, of type 'sha1', appending this.salt, which creates a random long string
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

//exporting the model called "User", based on the userSchema
module.exports = mongoose.model("User", userSchema);
//"User" is the name of schema
// this "User" model can be used anywhere to create a new User update
