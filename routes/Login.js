const express = require("express");
const route = express.Router();
const User = require("../schemaModels/User")



route.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

route.post("/", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({email});
  res.send(user)

  try {
    const user = await User.find();
    console.log(user);
    // if(!user) res.send("user not found")
    // return res.send(user)
  } catch (err) {
    console.log("Login Error", err);
  }
});

module.exports = route;
