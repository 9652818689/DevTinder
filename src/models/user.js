const mongoose = require("mongoose");
const validator = require('validator');

const userSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:4,
        maxLength:50
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email!"+value)
            }
        }
    },
    password:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("add a strong password!"+value)
            }
        }
    },
    photoUrl:{
        type:String,
        default:"https://avatar.iran.liara.run/public",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid Photo Url!"+value)
            }
        }
    },
    age:{
        type:String,
        min:18
    },
    gender:{
        type:String,
        validate:(value)=>{
            if(!["male","female","others"].includes(value)){
                throw new Error("Invalid gender value")
            }
        }
    },
    skills:[String]
},{timestamps:true})

const User = mongoose.model("User",userSchema);
module.exports = User