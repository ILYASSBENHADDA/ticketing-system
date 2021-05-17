import React, { useState } from 'react'
import axios from 'axios'

function CreateTicket() {

     const [ticketInfo, setTicketInfo] = useState({
          title: '',
          type: '', // Hardware - Software
          description: '',
          emergency: '', // Normal - Medium - Urgent
     })

     const createTicket = () => {
          axios.post('http://localhost:4000/api/create-ticket', ticketInfo).then((response)=>{
               console.log(response+'Data Inserted!')
          })
          .catch((error) => { console.log(error)})
     }

     // onChange
     const onChange = (e) => {
          setTicketInfo({...ticketInfo, [e.target.name]: e.target.value})
     }

     return (
          <>
          <div className="modal fade" id="createTicket" tabIndex="-1">
               <div className="modal-dialog">
               <div className="modal-content">
                    {/* HEADER BOX */}
                    <div className="modal-header">
                         <h5 className="modal-title" id="exampleModalLabel">Create Ticket</h5>
                         <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                         </button>
                    </div>
                    {/* BODY BOX */}
                    <div className="modal-body">

                         <form onSubmit={createTicket}>
                              <div className="form-group">
                                   <label htmlFor="registration_number">Title</label>
                                   <input type="text" className="form-control" name="title" onChange={onChange}/>
                              </div>

                              <div className="form-group">
                                   <label>Type</label>
                                   <select className="custom-select" name="type" onChange={onChange}>
                                        <option>Type...</option>
                                        <option value='hardware'>Hardware</option>
                                        <option value='software'>Software</option>
                                   </select>
                              </div>

                              <div className="form-group">
                                   <label htmlFor="mark">Description</label>
                                   <textarea className="form-control" name="description" onChange={onChange} rows="4"></textarea>
                              </div>


                              <div className="form-group">
                                   <label>Emergency</label>
                                   <select className="custom-select" name="emergency" onChange={onChange}>
                                        <option>Emergency Type...</option>
                                        <option value='normal'>Normal</option>
                                        <option value='medium'>Medium</option>
                                        <option value='urgent'>Urgent</option>
                                   </select>
                              </div>

                         
                              <button type="submit" className="btn btn-primary">Create Ticket</button>
                         </form>



                    </div>
                    {/* FOOTER BOX*/}
                    <div className="modal-footer">
                         <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
               </div>
               </div>
          </div>
          </>
     )
}


export default CreateTicket