import React, { useState } from 'react'
import axios from 'axios'
import Sidebar from '../partials/Sidebar'
import Nav from '../partials/Nav'

function Register() {

     const [registerInfo, setRegisterInfo] = useState({
          role: '',
          first_name: '',
          last_name: '',
          email: '',
          phone: 0,
          department: '',
          password: ''
     })

     const [message, setMessage] = useState('')

     const register = (e) => {
          e.preventDefault()
          axios.post('http://localhost:4000/api/register', registerInfo).then((response) => {
               setMessage(response.data.message)
               console.log(response)
               // Reload page
               // setTimeout(()=> { window.location.reload() }, 1000)
          })
          .catch((err) => { console.log(err)})
     }

     // onChange
     const onChange = (e) => {
          setRegisterInfo({...registerInfo, [e.target.name]: e.target.value})
     }

     return (
          <>
          <Nav/>
          <div id="wrapper">

          <Sidebar/>

          <div id="page-content-wrapper">
               <div className="container-fluid">
                    <div className="row justify-content-center">
                         <div className="col-lg-6">
                              <h1>Register as {registerInfo.role} </h1>
               
                              {/* FORM */}
                              <form onSubmit={register}>
                                   {/* Switcher */}
                                   <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="role" value="employee" onChange={onChange} />
                                        <label class="form-check-label"> As Employee </label>
                                   </div>
                                   <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="role" value="technician" onChange={onChange} />
                                        <label class="form-check-label"> As Technician </label>
                                   </div>
                                   <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="role" value="admin" onChange={onChange} />
                                        <label class="form-check-label"> As Admin </label>
                                   </div>
                                   {/* End Switcher */}

                                   <div className="form-group">
                                        <label>First name</label>
                                        <input type="text" className="form-control" name="first_name" onChange={onChange} />
                                   </div>

                                   <div className="form-group">
                                        <label>Last name</label>
                                        <input type="text" className="form-control" name="last_name" onChange={onChange} />
                                   </div>

                                   <div className="form-group">
                                        <label>Email</label>
                                        <input type="email" className="form-control" name="email" onChange={onChange} />
                                   </div>

                                   {registerInfo.role === 'admin' ? null : <>
                                   <div className="form-group">
                                        <label>Phone</label>
                                        <input type="number" className="form-control" name="phone" onChange={onChange} />
                                   </div>

                                   {registerInfo.role === 'technician' ? 
                                   <div className="form-group">
                                        <label>Department</label><br/>
                                        <select className="custom-select" name="department" onChange={onChange}>
                                             <option>Department...</option>
                                             <option value='hardware'>Hardware</option>
                                             <option value='software'>Software</option>
                                        </select>
                                   </div> 
                                   :
                                   <div className="form-group">
                                        <label>Department</label><br/>
                                        <select className="custom-select" name="department" onChange={onChange}>
                                             <option>Department...</option>
                                             <option value='web developer'>Web Developer</option>
                                             <option value='ux/ui designer'>UX/UI Designer</option>
                                             <option value='markter'>Markter</option>
                                        </select>
                                   </div>
                                   }
                                   </>}
                                   <div className="form-group">
                                        <label>Password</label>
                                        <input type="password" className="form-control" name="password" onChange={onChange} />
                                   </div>

                                   <button className="btn btn-primary">Register</button>
                              </form>
                              {/* ALERT */}
                              {message !== '' ? <h4 className="alert alert-primary mt-4"> {message} </h4> : null }

                         </div>
                    </div>




               </div>
          </div>
          </div>


          <div className="container">
               <div className="col-lg-8 py-4">
               
               </div>
          </div>
          </>
     )
}


export default Register