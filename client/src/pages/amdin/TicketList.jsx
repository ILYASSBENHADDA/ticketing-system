import React, {useState, useEffect} from "react"
import axios from 'axios'
import Nav from '../partials/Nav'
import Sidebar from "../partials/Sidebar"
import { Link } from "react-router-dom"

function TicketList() {
     const [ticketList, setTicketList] = useState([])

     useEffect(()=> {
          axios.get('http://localhost:4000/api/read-not-assign').then(response => {
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
                    <h1>Ticket list</h1>

                    <div className="row">     
                         <table className="table mt-4">
                              {/* Header Table */}
                              <thead className="thead-dark">
                              <tr>
                                   <th>Date</th>
                                   <th>Employee name</th>
                                   <th>Title</th>
                                   <th>Type</th>
                                   <th>Emergency</th>
                                   <th>Status</th>
                                   <th>Assign</th>
                              </tr>
                              </thead>

                              {/* Body Table */}
                              <tbody>

                              {ticketList.map((val, key) => (
                                   <tr key={key}>
                                        <th>{val.date}</th>
                                        <th>{val.id_employee.first_name + " " + val.id_employee.last_name}</th>
                                        <td>{val.title}</td>
                                        <td>{val.type}</td>
                                        <td>{val.emergency === 'urgent' ? <b style={{color: "red"}}>Urgent</b> : (val.emergency === 'medium' ? <b style={{color: "orange"}}>Medium</b> : <b style={{color: "grey"}}>Normal</b>)}</td>
                                        <td>{val.status === null ? <b style={{color: "orange"}}>Panding</b> : (val.status === false ? <b style={{color: "grey"}}>Assigned</b> : <b style={{color: "green"}}>Closed</b> )}</td>
                                        <td><Link to={`/ticket-list=${val._id}`} className="btn btn-secondary sm"><i className="fas fa-paper-plane"></i></Link></td>
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

export default TicketList