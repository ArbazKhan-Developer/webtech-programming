require('dotenv').config({ path: './config.env' })
var mongoose = require('mongoose')
const registerdata = require('./models/registrationModel')
const formdata = require('./models/formModel')

const db = process.env.DATABASE.replace('<PASSWORD>', process.env.MONGODB_PASSWORD)
// console.log(db);

const DB = db.replace("formdata", process.env.COLLECTION)
// console.log(DB);

var conn = mongoose.createConnection(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
});
var conn2 = mongoose.createConnection(DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
});


const Credential = conn2.model("Credential", registerdata)

let Mydata = conn.model("Mydata", formdata)

module.exports = {
      logindb: Credential,
      formdb: Mydata
};