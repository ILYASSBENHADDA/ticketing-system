import React, { useState } from 'react'
import axios from 'axios'
import Nav from './partials/Nav'
axios.defaults.withCredentials = true

function Login() {

     const [loginInfo, setLoginInfo] = useState({
          email: '',
          password: ''
     })

     const [message, setMessage] = useState('')

     const login = (e) => {
          e.preventDefault()
          axios.post('http://localhost:4000/api/login', loginInfo, { withCredentials: true }).then((response) => {
               setMessage(response.data.message)
               console.log(response)
               // Reload page
               // setTimeout(()=> { window.location.reload() }, 1000)
          })
          .catch((error) => { console.log(error)})
     }

     // onChange
     const onChange = (e) => {
          setLoginInfo({...loginInfo, [e.target.name]: e.target.value})
     }

     return (
          <>
          <Nav/>
          <div className="container">
               <div className="row justify-content-center">
                    <div className="col-lg-6 mt-4">
                    <h1>Login</h1>
                    {/* FORM */}
                    <form onSubmit={login}>
                         <div className="form-group">
                              <label>Email address</label>
                              <input type="email" className="form-control" name="email" value={loginInfo.email} onChange={onChange} />
                         </div>

                         <div className="form-group">
                              <label>Password</label>
                              <input type="password" className="form-control" name="password" value={loginInfo.password} onChange={onChange} />
                         </div>

                         <button className="btn btn-primary">Login</button>
                    </form>
                    {/* ALERT */}
                    {message !== '' ? <h4 className="alert alert-primary mt-4"> {message} </h4> : null }
                    </div>
               </div>
          </div>
          </>
     )
}

export default Login