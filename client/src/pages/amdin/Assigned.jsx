import React, {useState, useEffect} from "react"
import axios from 'axios'
import Nav from '../partials/Nav'
import Sidebar from "../partials/Sidebar"
import { Link } from "react-router-dom"

function Assigned() {
     const [ticketList, setTicketList] = useState([])

     useEffect(()=> {
          axios.get('http://localhost:4000/api/read-assigned').then(response => {
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
                    <h1>Ticket assigned </h1>

                    <div className="row">     
                         <table className="table mt-4">
                              {/* Header Table */}
                              <thead className="thead-dark">
                              <tr>
                                   <th>Date</th>
                                   <th>Employee Name</th>
                                   <th>Technician Name</th>
                                   <th>Title</th>
                                   <th>Type</th>
                                   <th>Emergency</th>
                                   <th></th>
                              </tr>
                              </thead>

                              {/* Body Table */}
                              <tbody>

                              {ticketList.map((val, key) => (
                                   <tr key={key}>
                                        <th>{val.date}</th>
                                        <th>{val.id_employee.first_name + ' ' + val.id_employee.last_name}</th>
                                        <th>{val.id_technician.first_name + ' ' + val.id_technician.last_name}</th>
                                        <td>{val.id_ticket.title}</td>
                                        <td>{val.id_ticket.type}</td>
                                        <td>{val.id_ticket.emergency === 'urgent' ? <b style={{color: "red"}}>Urgent</b> : (val.id_ticket.emergency === 'medium' ? <b style={{color: "orange"}}>Medium</b> : <b style={{color: "grey"}}>Normal</b>)}</td>
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