const Admin = require('../models/admin')
const Assign = require('../models/assign')
const Employee = require('../models/employee')
const Ticket = require('../models/ticket')

exports.readNotAssigned = (req, res, next) => {
     Ticket.find({status: null}).populate('id_employee').sort({"_id": -1})
     .then(data => {
          return res.json(data)
     })
}

exports.readAssigned = (req, res) => {
     Assign.find({is_accepted: null})
     .populate('id_employee id_technician id_ticket')
     .then(data => {
          return res.json(data)
     })
}

exports.readClose = (req, res) => {
     Ticket.find({status: true}).populate('id_employee').then(data => {
          return res.json(data)
     })
}

exports.readRefused = (req, res) => {
     Assign.find({is_accepted: false})
     .populate('id_ticket id_employee id_technician')
     .then(data => {
          return res.json(data)
     })
}

exports.readOneTicket = (req, res) => {
     const { id } = req.params
     Ticket.findById(id).then(data => {
          return res.json(data)
     })
}


exports.assignTicket = (req, res) => {
     const { id_employee, id_ticket, id_technician } = req.body
     
     new Assign({
          id_employee: id_employee,
          id_ticket: id_ticket,
          id_technician: id_technician
     })
     .save()
     .then(() => {
          Ticket.findByIdAndUpdate(id_ticket, {status: false}).then(() => {
               res.json({message: 'Ticket is assigned'})
          })
     })

}