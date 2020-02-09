const express = require("express");
const User = require("../schemaModels/User");
const route = express.Router();
const bcrypt = require("bcrypt");
const { registrationValidation } = require("../schemaModels/validationSchemas");

route.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});
//TODO:BODY PARSER ASK

//USER REGISTRATION
route.post("/", async (req, res) => {
  const { error } = registrationValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.send("Email is not valid");

  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    ...req.body,
    password: hashedPass
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    console.log("Error when saving", err);
  }
});

module.exports = route;
