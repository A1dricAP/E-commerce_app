/*
the main task of this file till now, is to define the schema of the user details to be fed as data on the page, which is inserted 
into the database via the server
*/

const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

//creating user schema
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    description: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
      maxlength: 32,
    },
    category: {
      type: ObjectId, //when we refer to the products category, it will go to the category model [../model/category]
      ref: "Category", //this depicts working with relationships, from one model to another model.
      required: true,
    },
    quantity: {
      type: Number,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    shipping: {
      required: false,
      type: Boolean,
    },
  },

  //getting timestamps for each entry
  { timestamps: true }
);

/************************************************************************************************************************************************/

//exporting the model called "User", based on the userSchema
module.exports = mongoose.model("Product", productSchema);
//"Product" is the name of schema
// this "Product " model can be used anywhere to create a new User update
