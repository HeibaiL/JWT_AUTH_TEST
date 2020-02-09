const express = require("express");
const RegisterSchema = require("../schemaModels/Registration")
const route = express.Router();



route.get('/', async (req,res)=>{
    const users = await RegisterSchema.find();
    res.json(users)
    
})
//TODO:BODY PARSER ASK
route.post('/', async (req,res)=>{ 
    const {name,login,password,date} = req.body;
    const user = new RegisterSchema({
        name,
        login,
        password,
        date
    })
    try {
      const savedUser = await user.save();
      res.send(savedUser);
      } catch (err) {
        console.log("Error when saving", err);
      }
})

module.exports = route;