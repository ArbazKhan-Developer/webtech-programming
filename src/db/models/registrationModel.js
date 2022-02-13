const mongoose = require('mongoose')
const validator = require('validator');


const logindata = new mongoose.Schema({
    username: {
        type: String,
        require: [true, "please provide username"],
        unique: [true, "username already exist"]
    },
    useremail: {
        type: String,
        require: [true, 'please provide your email'],
        validate(value) {
            if (!validator.isEmail(value))
                throw new error("email is not correct");
        }
    },
    password: {
        type: String,
        require: [true, "please provide password"],
        min: [4, "password should be minimum 4 char"]
    },
    confirm_password: {
        type: String,
        require: [true, "please provide confirm password"]
    },
    token:{
            type:String
    }
})

module.exports = logindata
