const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Employee Schema
let employeeSchema = new Schema({
     first_name: {type: String, default: ""},
     last_name: {type: String, default: ""},
     email: {type: String, default: ""},
     phone: {type: Number, default: ""},
     department: {type: String, default: ""},
     hire_date: {type: String, default: ""},
     password: {type: String, default: ""}
},
{
     versionKey: false
})


module.exports = mongoose.model('Employee', employeeSchema)