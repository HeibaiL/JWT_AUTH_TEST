const express = require("express");
const User = require("../schemaModels/User");
const route = express.Router();
const bcrypt = require("bcrypt");
const { registrationValidation } = require("../schemaModels/validationSchemas");

route.get("/", async (req, res) => {
  const users = await User.find();
  res.send("<h1>Registration page</h1>");
});

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
    res.send({ user: savedUser._id });
  } catch (err) {
    console.log("Error when saving", err);
  }
});

module.exports = route;
