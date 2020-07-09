const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

//importing routes
const userRoutes = require("./routes/user");

//app
const app = express();

//setting up database
mongoose
  .connect(process.env.Database, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database is connected");
  });

//routes middleware
app.use("/api", userRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port : ${port}`);
});
