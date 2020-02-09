const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
require("dotenv").config();
const registrationRoute = require("./routes/Registration");

app.use(bodyParser.json());
app.use('/registration', registrationRoute);

app.get("/", (req, res) => {
  res.send("<h1>it's your home page</h1>");
});

mongoose.connect(
    process.env.DB_CONNECT_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
  ()=>console.log("Connected to DB")).catch(err=>console.log("We got err",err))

  
app.listen(3000);
