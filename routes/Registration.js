const express = require("express");
const route = express.Router();

route.get('/',(req,res)=>{
    res.send("WE need your login password and name")
})

module.exports = route;