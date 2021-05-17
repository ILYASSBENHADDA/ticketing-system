const express = require('express')
const { readTechnician, readAssignedTicket, confirmTicket } = require('../controllers/tech.controller')
const router = express.Router()


// Read All technician
router.get('/read-technician', readTechnician)

router.get('/ticket-tech', readAssignedTicket)

router.post('/confirm-ticket', confirmTicket)


module.exports = router