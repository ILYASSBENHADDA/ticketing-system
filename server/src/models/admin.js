const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Admin Schema
let adminSchema = new Schema({
     first_name: {type: String, default: ""},
     last_name: {type: String, default: ""},
     email: {type: String, default: ""},
     password: {type: String, default: ""}
},
{ 
     versionKey: false
})


module.exports = mongoose.model('Admin', adminSchema)