const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const registrationRoute = require("./routes/Registration")

const User = require("./schemaModels/UserModel")

app.get("/", (req, res) => {
  res.send("<h1>it's your home page</h1>");
});
app.use('/registration',registrationRoute)

mongoose.connect(
    process.env.DB_CONNECT_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("Connected to DB");
    }
  );

  
app.listen(3000, () => {
  console.log("Hello world");
});
