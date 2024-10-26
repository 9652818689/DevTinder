const validator = require('validator');

const validateSignUp = (req)=>{
    const {firstName,lastName,emailId,password} = req.body;

    if(!firstName || !lastName){
        throw new Error("Name is not valid!")
    }else if(!validator.isEmail(emailId)){
        throw new Error("Invali EmailId!");
    }else if(!validator.isStrongPassword(password)) {
        throw new Error("Password length should be minLength: 8 and password should be minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 ")
    }
}

module.exports = {validateSignUp}