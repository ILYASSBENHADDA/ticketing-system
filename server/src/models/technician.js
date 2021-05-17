const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Technician Schema
let technicianSchema = new Schema({
     first_name: {type: String, default: ""},
     last_name: {type: String, default: ""},
     email: {type: String, default: ""},
     department: {type: String, default: ""},
     hire_date: {type: String, default: ""},
     password: {type: String, default: ""},

},
{ 
     versionKey: false
})


module.exports = mongoose.model('Technician', technicianSchema)