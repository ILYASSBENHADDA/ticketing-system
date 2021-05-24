const express = require('express')
const { assignTicket, readOneTicket, readNotAssigned, readAssigned, readClose, readRefused, createAdmin, Search } = require('../controllers/admin.controller')
const router = express.Router()

// Assign
router.get('/read-not-assign', readNotAssigned)
router.post('/search', Search)
router.get('/read-assigned', readAssigned)
router.get('/read-closed', readClose)
router.get('/read-refused', readRefused)
router.get('/read-ticket/:id', readOneTicket)

router.post('/assign', assignTicket)


module.exports = router