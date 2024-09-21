const mongoose = require('mongoose');

const connectDB = async()=>{
    mongoose.connect("mongodb+srv://vijay777:vijay777@cluster0.dnwig.mongodb.net/devTinder")
}

module.exports = connectDB