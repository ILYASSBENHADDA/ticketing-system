const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const Admin = require('../models/admin')
const Employee = require('../models/employee')
const Technician = require('../models/technician')

// Create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id, role) => {
     return jwt.sign({ id, role }, process.env.JWT_SECRET, {
          expiresIn: maxAge
     })
}




/*
* Register Employee & Technician
*/
exports.register = (req, res) => {
     const { role, first_name, last_name, email, phone, department, hire_date, password } = req.body
     const HashPass = bcrypt.hashSync(password, 5)

     // Register employee
     if (role === 'employee') {
          Employee.findOne({email: email}).then(data => {
               if(data) {
                    return res.json({message: 'Email already exist'})
               }
     
               new Employee({
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    phone: phone,
                    department: department,
                    hire_date: hire_date,
                    password: HashPass
               })
               .save()
               .then(data => {
                    return res.json({data: data, message: "Employee created success"})
               })
               
          }).catch(function(err) {console.log(err)})
     }

     // Register technician 
     else if (role === 'technician') {
          Technician.findOne({email: email}).then(data => {
               if(data) {
                    return res.json({message: 'Email already exist'})
               }
     
               new Technician({
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    department: department,
                    hire_date: hire_date,
                    password: HashPass
               })
               .save()
               .then(data => {
                    return res.json({data: data, message: "Technician created success"})
               })
               
          }).catch(function(err) {console.log(err)})
     }

     else if(role === 'admin') {
          new Admin({
               first_name: first_name,
               last_name: last_name,
               email: email, 
               password: HashPass
          }).save()
          .then(data => {
               res.json({data: data, message: "Admin created success"})
          })
     }

     else {
          return res.json({message: "Please choose the role."})
     }
     
     
}


/*
* Login
*/
exports.login = (req, res) => {
     const { email, password } = req.body

     Admin.findOne({email: email}).then(admin => {
          if(!admin) {
               Employee.findOne({email: email}).then(employee => {
                    if(!employee) {
                         Technician.findOne({email: email}).then(technician => {
                              if(!technician) {
                                   return res.json({message: 'Email or password incorrect'})
                              }

                              if(!bcrypt.compareSync(password, technician.password)) {
                                   return res.json({message: 'Email or password incorrect'})
                              }
          
                              // Setup Token in Cookie
                              const role = 'technician'
                              const token = createToken(technician._id, role)
                              return res.status(200).cookie('technician_token', token, {
                                   httpOnly: true,
                                   maxAge: maxAge * 1000
                              }).json({message: 'You\'re LoggedIn as Technician'})
                         }).catch((err) => {console.log(err)})
                    }

                    if(!bcrypt.compareSync(password, employee.password)) {
                         return res.json({message: 'Email or password incorrect'})
                    }

                    // Setup Token in Cookie
                    const role = 'employee'
                    const token = createToken(employee._id, role)
                    return res.status(200).cookie('employee_token', token, {
                         httpOnly: true,
                         maxAge: maxAge * 1000
                    }).json({message: 'You\'re LoggedIn as Employee'})
               }).catch((err) => {console.log(err)})
          }

          if(!bcrypt.compareSync(password, admin.password)) {
               return res.json({message: 'Email or password incorrect'})
          }

          // Setup Token in Cookie
          const role = 'admin'
          const token = createToken(admin._id, role)
          return res.status(200).cookie('admin_token', token, {
               httpOnly: true,
               maxAge: maxAge * 1000
          }).json({message: 'You\'re LoggedIn as Admin'})
     }).catch((err) => {console.log(err)})
}

/* 
* Logout
*/
exports.logout = (req, res) => {
     res.clearCookie('admin_token')
     res.clearCookie('technician_token')
     res.clearCookie('employee_token')

     // res.cookie('employee_token', '', { maxAge: 1 })
     // res.cookie('admin_token', '', { maxAge: 1 })
     // res.cookie('technician_token', '', { maxAge: 1 })
     res.redirect('/')
 }