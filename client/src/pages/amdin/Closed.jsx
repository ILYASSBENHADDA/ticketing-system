import React, {useState, useEffect} from "react"
import axios from 'axios'
import Nav from '../partials/Nav'
import Sidebar from "../partials/Sidebar"
import { Link } from "react-router-dom"

function Closed() {
     const [ticketList, setTicketList] = useState([])

     useEffect(()=> {
          axios.get('http://localhost:4000/api/read-closed').then(response => {
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
                    <h1>Ticket closed</h1>

                    <div className="row">     
                         <table className="table mt-4">
                              {/* Header Table */}
                              <thead className="thead-dark">
                              <tr>
                                   <th>Name</th>
                                   <th>Title</th>
                                   <th>Type</th>
                                   <th>Emergency</th>
                                   <th>Status</th>
                              </tr>
                              </thead>

                              {/* Body Table */}
                              <tbody>

                              {ticketList.map((val, key) => (
                                   <tr key={key}>
                                        <th>{val.id_employee.first_name + " " + val.id_employee.last_name}</th>
                                        <td>{val.title}</td>
                                        <td>{val.type}</td>
                                        <td>{val.emergency}</td>
                                        <td>{val.status === null ? "Panding" : (val.status === false ? "Assigned" : "Finiched" )}</td>
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

export default Closed