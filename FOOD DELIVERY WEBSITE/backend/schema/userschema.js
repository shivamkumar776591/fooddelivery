const mongoose = require("mongoose");
const validator = require("validator")
const UserData = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
   
    email:{
        type:String,
        required:true,
        unique:true,
        validator(value){
            if(!validator.isEmail(value)){
                res.send("invalid email");
            }
        }
    },
    
   
  
    adress:{
        type:String,
        required:true
    },
      password:{
        type:String,
        required:true
    },
    
})

const Registeruser = new mongoose.model("Ouruserdata",UserData);
module.exports = Registeruser;