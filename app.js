const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyparser = require("body-parser");
require("dotenv").config();

//importing routes
const userRoutes = require("./routes/user");

//app
const app = express();

/*setting up database
FOR DATABASE TO CONNECT, ALWAYS ENSURE, MONGODB CONNECTION COMMAND 
[mongod --config /usr/local/etc/mongod.conf] IS DECALRED IN TERMINAL
*/
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database is connected");
  })
  .catch((err) => {
    return err;
  });

//routes middleware
app.use("/api", userRoutes); //using the route created in routes folder.

const port = process.env.PORT || 8000;

//for listening on specified port
app.listen(port, () => {
  console.log(`Server is running on port : ${port}`);
});
