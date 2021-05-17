import React, {useState, useEffect} from "react"
import axios from 'axios'
import Nav from '../partials/Nav'
import Sidebar from "../partials/Sidebar"
import { Link } from "react-router-dom"

function Assigned() {
     const [ticketList, setTicketList] = useState([])

     useEffect(()=> {
          axios.get('http://localhost:4000/api/read-refused').then(response => {
               setTicketList(response.data)
               console.log(response)
          })
     }, [])

     return (
          <>
          <Nav/>
          <div id="wrapper">

          <Sidebar/>

          <div id="page-content-wrapper">
               <div className="container-fluid">
                    <h1>Refused tickets</h1>

                    <div className="row">     
                         <table className="table mt-4">
                              {/* Header Table */}
                              <thead className="thead-dark">
                              <tr>
                                   <th>Name</th>
                                   <th>Date</th>
                                   <th>Title</th>
                                   <th>Type</th>
                                   <th>Emergency</th>
                                   <th>Refused By</th>
                                   <th>Re-Assign</th>
                              </tr>
                              </thead>

                              {/* Body Table */}
                              <tbody>

                              {ticketList.map((val, key) => (
                                   <tr key={key}>
                                        <th>{val.id_employee.first_name}</th>
                                        <th>{val.date}</th>
                                        <td>{val.id_ticket.title}</td>
                                        <td>{val.id_ticket.type}</td>
                                        <td>{val.id_ticket.emergency === 'urgent' ? <b style={{color: "red"}}>Urgent</b> : (val.emergency === 'medium' ? <b style={{color: "orange"}}>Medium</b> : <b style={{color: "grey"}}>Normal</b>)}</td>
                                        <td>{val.id_technician.first_name + ' ' + val.id_technician.last_name}</td>
                                        <td><Link to={`/ticket-list=${val.id_ticket._id}`} className="btn btn-secondary sm"><i className="fas fa-paper-plane"></i></Link></td>
                                   </tr>
                              ))}

                              </tbody>
                         </table>
                    </div>
               </div>
          </div>
          </div>
          </>
     )
}

export default Assigned