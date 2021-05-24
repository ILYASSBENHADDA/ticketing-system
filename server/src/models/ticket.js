const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Ticket Schema
let ticketSchema = new Schema({
     id_employee: {type: Schema.Types.ObjectId, ref: 'Employee'},
     title: {type: String, default: ""},
     type: {type: String, default: ""}, // Hardware - Software
     description: {type: String, default: ""},
     emergency: {type: String, default: "Urgent"}, // Normal - Medium - Urgent
     status: {type: Boolean, default: null}, // Panding - Assigned (Re-assigned) - Finished
     date: {type: Date, default: Date.now}
},
{
     versionKey: false
})


module.exports = mongoose.model('Ticket', ticketSchema)