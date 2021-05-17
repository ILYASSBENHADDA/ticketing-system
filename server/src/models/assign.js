const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Assign Schema
let assignSchema = new Schema({
     id_employee: {type: Schema.Types.ObjectId,  ref: 'Employee'},
     id_ticket: {type: Schema.Types.ObjectId,  ref: 'Ticket'},
     id_technician: {type: Schema.Types.ObjectId,  ref: 'Technician'},
     date: {type: Date, default: Date.now},
     is_accepted: {type: Boolean, default: null},
},
{ 
     versionKey: false
})


module.exports = mongoose.model('Assign', assignSchema)