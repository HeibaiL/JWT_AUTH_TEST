const express = require("express");
const route = express.Router();
const User = require("../schemaModels/User");
const bcrypt = require("bcrypt");
const { loginValidation } = require("../schemaModels/validationSchemas");


route.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

route.post("/", async (req, res) => {
  const { login, password } = req.body;
  const {error} = await loginValidation(req.body);
  if(error) return res.status(401).send(error.details[0].message);

  const user = await User.findOne({login});
  if(!user) return res.send("User with this login not found")
  const validPass = bcrypt.compareSync(password, user.password);
  if(!validPass) return res.send("Password is not valid")

  return res.send("You are logged in")


  // try {
  //   const user = await User.find();
  //   console.log(user);
  //   // if(!user) res.send("user not found")
  //   // return res.send(user)
  // } catch (err) {
  //   console.log("Login Error", err);
  // }
});

module.exports = route;
