const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const cookieparser = require("cookie-parser");
const expressValidator = require("express-validator");
const cors = require("cors");
require("dotenv").config();

//importing routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");

//app
const app = express();

/*setting up database
FOR DATABASE TO CONNECT, ALWAYS ENSURE, MONGODB CONNECTION COMMAND 
[mongod --config /usr/local/etc/mongod.conf] IS DECALRED IN TERMINAL
*/

// const Uri =
// "mongodb+srv://Aldric_ap:a1dr1c00@cluster0-mt34g.mongodb.net/cluster?retryWrites=true&w=majority";

// //disabling the Atlas cluster till further requirement.
// mongoose
//   .connect(process.env.URI, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("MongoDB Atlas");
//   })
//   .catch((err) => {
//     return err;
//   });

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    autoIndex: true,
  })
  .then(() => {
    console.log("MongoDB Database (Locally) is connected. ");
  })
  .catch((err) => {
    return err;
  });

//middleware
app.use(morgan("dev"));
app.use(bodyparser.json());
app.use(cookieparser());
app.use(expressValidator());
app.use(cors());

//routes middleware
app.use("/api", authRoutes); //using the route created in routes folder.
app.use("/api", userRoutes); //using the route created in routes folder.
app.use("/api", categoryRoutes); //using the route created in routes folder.
app.use("/api", productRoutes); //using the route created in routes folder.

const port = process.env.PORT;

//for listening on specified port
app.listen(port, () => {
  console.log(`Server is running on port : ${port}`);
});
