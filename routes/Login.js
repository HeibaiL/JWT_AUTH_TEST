const express = require("express");
const route = express.Router();
const User = require("../schemaModels/User");
const bcrypt = require("bcrypt");
const { loginValidation } = require("../schemaModels/validationSchemas");
const auth = require("../routes/verifyToken");
const jwt = require("jsonwebtoken");

route.get("/", auth, async (req, res) => {
  const users = await User.find();
  res.send("<h1>Login page</h1>");
});

route.post("/", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { login, password } = req.body;
  const user = await User.findOne({ login });
  if (!user) return res.send("User with this login not found");
  const validPass = bcrypt.compareSync(password, user.password);

  if (!validPass) return res.send("Password is not valid");
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
});

module.exports = route;
