import React, {useState, useEffect} from "react"
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Nav from '../partials/Nav'
import Sidebar from "../partials/Sidebar"

function Single() {
     const { id } = useParams()
     const [ticket, setTicket] = useState([])
     const [techList, setTechList] = useState([])
     const [idEmp, setIdEmp] = useState('')
     const [assignInfo, setAssignInfo] = useState({
          id_technician: ''
     })


     useEffect(()=> {
          axios.get('http://localhost:4000/api/read-technician').then(response => {
               setTechList(response.data)
               console.log(response)
          })
          axios.get(`http://localhost:4000/api/read-ticket/${id}`).then(response => {
               setTicket(response.data)
               setIdEmp(response.data.id_employee)
               
               console.log(response)
          })
     }, [id])

     const { id_technician } = assignInfo
     const onChange = (e) => {
          setAssignInfo({...assignInfo, [e.target.name]: e.target.value})
     }
     

     // Assign submit
     const assign = (e) => {
          e.preventDefault()
          axios.post('http://localhost:4000/api/assign', {
               id_ticket: id,
               id_employee: idEmp,
               id_technician: id_technician
          })
     }


     return (
          <>
          <Nav/>
          <div id="wrapper">

          <Sidebar/>

          <div id="page-content-wrapper">
               <div className="container-fluid">
                    <h1>Assign Ticket</h1>

                    <div className="row justify-content-center">
                         <div className="col-lg-6 mt-4">
                         {/* FORM */}
                         <form onSubmit={assign}>
                              <fieldset disabled>
                              <div className="form-group">
                                   <label>Date</label>
                                   <input type="text" className="form-control" value={ticket.date} />
                              </div>
                              <div className="form-group">
                                   <label>Title</label>
                                   <input type="text" className="form-control" value={ticket.title} />
                              </div>
                              <div className="form-group">
                                   <label>Type</label>
                                   <input type="text" className="form-control" value={ticket.type} />
                              </div>
                              <div className="form-group">
                                   <label>Description</label>
                                   <textarea className="form-control" value={ticket.description} rows="4"></textarea>
                              </div>
                              <div className="form-group">
                                   <label>Emergency</label>
                                   <input type="text" className="form-control" value={ticket.emergency} />
                              </div>
                              </fieldset>
                              <div className="form-group">
                                   <label>Technician</label>
                                   <select className="custom-select" name="id_technician" onChange={onChange}>
                                        <option>Technician...</option>
                                        {techList.map((tech, key) => (
                                             ticket.type === tech.department ?
                                             <option value={tech._id}>{tech.first_name} ({tech.department})</option>
                                             : null
                                        ))}
                                   </select>
                              </div>
                              <button type="submit" className="btn btn-primary mt-3">Assign</button>

                         </form>
                         {/* **************************************** */}
                         </div>
                    </div>
               </div>
          </div>
          </div>
          </>
     )
}

export default Single