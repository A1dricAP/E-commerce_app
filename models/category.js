/*
the main task of this file till now, is to define the schema of the user details to be fed as data on the page, which is inserted 
into the database via the server
*/

const mongoose = require("mongoose");

//creating user schema
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
  },

  //getting timestamps for each entry
  { timestamps: true }
);

/************************************************************************************************************************************************/

//exporting the model called "User", based on the userSchema
module.exports = mongoose.model("Category", categorySchema);
//"User" is the name of schema
// this "User" model can be used anywhere to create a new User update
