const jwt = require('jsonwebtoken');

exports.isLoggedIn =  (req, res, next) => {
     const token = req.cookies.admin_token || (req.cookies.technician_token || req.cookies.employee_token)
     console.log(token)
     if (token) {
          jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
               if (err) throw err
               
               else {
                    next()
               }
          })
     }
     else {
          return res.status(400).json('you\'re not logged in')
     }

}


// Check user role & is auth or not
exports.checkUser = (req, res, next) => {
     const token = req.cookies.admin_token || (req.cookies.technician_token || req.cookies.employee_token)
     if (token) {
          jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
               if (err) throw err
               else {
                    decodedToken.role === 'admin'
                         ? res.status(200).json({ role: 'Admin', isAuthenticated: true })
                         : ( decodedToken.role === 'technician' ? res.status(200).json({ role: 'Technician', isAuthenticated: true }) : res.status(200).json({ role: 'Employee', isAuthenticated: true }) )
               }
          })
     }
     else {
          res.status(200).json({ role: '', isAuthenticated: false})
     }
}