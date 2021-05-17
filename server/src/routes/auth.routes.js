const express = require('express')
const { login, register, logout } = require('../controllers/auth.controller')
const router = express.Router()


// Register Employee
router.post('/register', register)

// Login
router.post('/login', login)

// Logout
router.get('/logout', logout)



module.exports = router