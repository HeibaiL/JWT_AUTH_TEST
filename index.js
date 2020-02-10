const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
require("dotenv").config();
const registrationRoute = require("./routes/Registration");
const loginRoute = require("./routes/Login");

app.use(bodyParser.json());
app.use('/registration', registrationRoute);
app.use('/login', loginRoute);


app.get("/", (req, res) => {
  res.send("<h1>it's your home page</h1>");
});

mongoose.connect(
    process.env.DB_CONNECT_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
  ()=>console.log("Connected to DB"))

  
app.listen(3000);
