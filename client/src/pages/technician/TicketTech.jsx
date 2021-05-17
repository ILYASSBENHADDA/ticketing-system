import React, {useState, useEffect} from "react"
import axios from 'axios'
import Nav from '../partials/Nav'
import Sidebar from "../partials/Sidebar"

function TicketTech() {
     const [ticketList, setTicketList] = useState([])

     useEffect(()=> {
          axios.get('http://localhost:4000/api/ticket-tech').then(response => {
               setTicketList(response.data)
               console.log(response)
          })
     }, [])


     const confirmTicket = (confirm, id) => {
          console.log(confirm, id)
          axios.post('http://localhost:4000/api/confirm-ticket', { confirm, id }).then(response => {
               console.log(response)
          })
     }

     return (
          <>
          <Nav/>
          <div id="wrapper">

          <Sidebar/>

          <div id="page-content-wrapper">
               <div className="container-fluid">
                    <h1>Ticket technician </h1>

                    <div className="row">     
                         <table className="table mt-4">
                              {/* Header Table */}
                              <thead className="thead-dark">
                              <tr>
                                   <th>Date</th>
                                   <th>Title</th>
                                   <th>Emergency</th>
                                   <th>View Details</th>
                                   <th>Confirm</th>
                              </tr>
                              </thead>

                              {/* Body Table */}
                              <tbody>

                              {ticketList.map((val, key) => (
                                   <tr key={key}>
                                        {val.id_ticket.status ? null : ( val.id_ticket.status === null ? null :<>
                                        <th>{val.date}</th>
                                        <td>{val.id_ticket.title}</td>
                                        <td>{val.id_ticket.emergency === 'urgent' ? <b style={{color: "red"}}>Urgent</b> : (val.id_ticket.emergency === 'medium' ? <b style={{color: "orange"}}>Medium</b> : <b style={{color: "grey"}}>Normal</b>)}</td>
                                        <th>
                                             <button className="btn btn-secondary sm" data-toggle="modal" data-target="#details"><i className="fas fa-eye"></i></button>
                                        </th>
                                        <td>
                                             <button onClick={()=>{confirmTicket(true, val.id_ticket._id)}} className="btn btn-secondary sm"><i className="fas fa-check"></i></button>
                                             <button onClick={()=>{confirmTicket(false, val.id_ticket._id)}} className="btn btn-secondary sm mx-1"><i className="fas fa-times"></i></button>
                                        </td>
                                        <div className="modal fade" id="details" tabIndex="-1">
                                        <div className="modal-dialog">
                                        <div className="modal-content">
                                             {/* HEADER BOX */}
                                             <div className="modal-header">
                                                  <h5 className="modal-title">Ticket Details</h5>
                                                  <button type="button" className="close" data-dismiss="modal">
                                                       <span aria-hidden="true">&times;</span>
                                                  </button>
                                             </div>
                                             {/* BODY BOX */}
                                             <div className="modal-body">
                                             <fieldset disabled>
                                                  <form>
                                                       <div className="form-group">
                                                            <label>Employee name</label>
                                                            <input type="text" className="form-control" value={val.id_employee.first_name + " " + val.id_employee.last_name}/>
                                                       </div>
                                                       <div className="form-group">
                                                            <label>Phone</label>
                                                            <input type="text" className="form-control" value={val.id_employee.phone}/>
                                                       </div>
                                                       <div className="form-group">
                                                            <label>Title</label>
                                                            <input type="text" className="form-control" value={val.id_ticket.title}/>
                                                       </div>

                                                       <div className="form-group">
                                                            <label htmlFor="mark">Description</label>
                                                            <textarea className="form-control" rows="4">{val.id_ticket.description}</textarea>
                                                       </div>

                                                       <div className="form-group">
                                                            <label>Emergency</label>
                                                            <input type="text" className="form-control" value={val.id_ticket.emergency}/>
                                                       </div>
                                                  </form>
                                             </fieldset>


                                             </div>
                                             {/* FOOTER BOX*/}
                                             <div className="modal-footer">
                                                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                             </div>
                                        </div>
                                        </div>
                                   </div>
                                   </>)}
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

export default TicketTech