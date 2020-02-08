var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name:{
        required:true,
        type:String,
    },
    login:{
        required:true,
        type:String,
        min:2,
        max:255
    },
    password:{
        required:true,
        type:String,
        min:2,
        max:255
    },
    date:{
        type:Date,
        default:Date.now(),
    }
});

module.exports = mongoose.model("User", userSchema);