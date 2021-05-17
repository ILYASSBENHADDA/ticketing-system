const jwt = require('jsonwebtoken')
const Assign = require("../models/assign")
const Technician = require("../models/technician")
const Ticket = require('../models/ticket')


exports.readAssignedTicket = (req, res, next) => {

     const token = req.cookies.technician_token
     let id_technician
     if (token) {
          jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
               if (err) throw err
               id_technician = decodedToken.id
          })
     } else {
          return res.json('NOOP')
     }


     Assign.find({id_technician: id_technician, is_accepted: null})
     .populate('id_ticket id_employee')
     .then(data => {
          return res.json(data)
     })
     
     

}

exports.readTechnician = (req, res) => {
     Technician.find()
     .then(data => {
          return res.json(data)
     })
}


exports.confirmTicket = (req, res) => {
     const { confirm, id } = req.body
     console.log(confirm, id)

     if (confirm === true) {
          Ticket.findByIdAndUpdate(id, {status: true}).then(data => {
               Assign.findOneAndUpdate({id_ticket: id}, {is_accepted: true}).then(() => {
                    return res.json({message: "Ticket closed success"})
               })
          })
     }

     else if(confirm === false) {
          Ticket.findByIdAndUpdate(id, {status: null}).then(data => {
               Assign.findOneAndUpdate({id_ticket: id}, {is_accepted: false}).then(() => {
                    return res.json({message: "Ticket refused"})
               })
          })
     }     

}