const express = require('express')
const router = express.Router()
const { createTicket, readTicket, deleteTicket } = require('../controllers/emp.controller')


// Create Ticket
router.post('/create-ticket', createTicket)

// Read Ticket
router.get('/read-tickets', readTicket)

// Delete Ticket
router.delete('/delete-ticket/:id', deleteTicket)


module.exports = router