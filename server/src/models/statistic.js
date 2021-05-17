const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Statistics Schema
let statisticSchema = new Schema({
     num_total_ticket,
     num_accepts_ticket,
     num_refuse_ticket,
},
{
     versionKey: false
})


module.exports = mongoose.model('Statistic', statisticSchema)