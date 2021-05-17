import React, {useState, useEffect} from "react"
import axios from 'axios'
import Nav from '../partials/Nav'
import Sidebar from "../partials/Sidebar"
import CreateTicket from "../partials/CreateTicket"

function Tickets() {
     const [ticketList, setTicketList] = useState([])
     
     useEffect(()=> {
          axios.get('http://localhost:4000/api/read-tickets').then(response => {
               setTicketList(response.data)
               console.log(response)
          })
     }, [])


     const deleteTicket = (id) => {
          const ask = window.confirm('Are sure you want to delete this ticket?')
          if (ask === true) {
               axios.delete(`http://localhost:4000/api/delete-ticket/${id}`).then(()=> {
                    window.location.reload()
               })
          }          
     }


     return (
          <>
          <Nav/>
          <div id="wrapper">

          <Sidebar/>

          <div id="page-content-wrapper">
               <div className="container-fluid">
                    <h1>Ticket Employee</h1>
                    {/* Create New Ticket */}
                    <button type="button" className="btn btn-secondary" data-toggle="modal" data-target="#createTicket"> Create New </button>
                    <CreateTicket/>

                    <div className="row">     
                         <table className="table mt-4">
                              {/* Header Table */}
                              <thead className="thead-dark">
                              <tr>
                                   <th>Date</th>
                                   <th>Title</th>
                                   <th>Type</th>
                                   <th>Emergency</th>
                                   <th>Status</th>
                                   <th></th>
                              </tr>
                              </thead>

                              {/* Body Table */}
                              <tbody>

                              {ticketList.map((val, key) => (
                                   <tr key={key}>
                                        <th>{val.date}</th>
                                        <td>{val.title}</td>
                                        <td>{val.type}</td>
                                        <td>{val.emergency}</td>
                                        <td>{val.status === null ? <b style={{color: "orange"}}>Panding</b> : (val.status === false ? <b style={{color: "grey"}}>Assigned</b> : <b style={{color: "green"}}>Closed</b> )}</td>
                                        <td>
                                             <button onClick={()=>{deleteTicket(val._id)}} className="btn btn-secondary sm mr-1"><i className="far fa-trash-alt"></i></button>
                                        </td>
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

export default Tickets