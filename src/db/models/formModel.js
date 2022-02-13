const mongoose = require('mongoose');
const validator = require('validator');

const formdata = new mongoose.Schema({
      name: {
            type: String,
            require: [true, 'please enter you name'],
            minlength: 3
      },
      email: {
            type: String,
            require: [true, 'please provide your email'],
            validate(value) {
                  if (!validator.isEmail(value))
                        throw new error("email is not correct");
            }
      },
      phone: {
            type: Number,
            require: [true, 'please provide you number'],
            min: 10
      },
      message: {
            type: String,
            require: [true, 'please enter you name'],
            minlength: 3
      }

})

module.exports = formdata;