const express = require("express");
const User = require("../schemaModels/User");
const route = express.Router();
const { registrationValidation } = require("../schemaModels/validationSchemas");

route.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});
//TODO:BODY PARSER ASK

//USER REGISTRATION
route.post("/", async (req, res) => {
  const { name, login, password, date, email } = req.body;
  const { error } = registrationValidation(req.body)
  if (error) return res.json(error.details[0].message);
  const user = new User({
    name,
    login,
    password,
    email,
    date
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    console.log("Error when saving", err);
  }
});

module.exports = route;
