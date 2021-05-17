import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from "../../components/UserContext"


function Sidebar() {

     const {role} = useContext(UserContext)

     return (
          <>
          <div id="sidebar-wrapper">
               <ul className="sidebar-nav">
                    <li className="sidebar-brand">
                         <Link to="/"> Ticketing System </Link>
                    </li>
                    
                    { role === 'Employee' ? 
                    <>
                    <li>
                         <Link to="/create-ticket">Create Ticket</Link> 
                    </li>
                    </> : null }

                    { role === 'Admin' ? 
                    <>
                    <li>
                         <Link to="/register-user">Register user</Link> 
                    </li>
                    <li>
                         <Link to="/ticket-list">Ticket list</Link>
                    </li>
                    <li>
                         <Link to="/ticket-assigned">Ticket assigned</Link>
                    </li>
                    <li>
                         <Link to="/ticket-closed">Ticket closed</Link>
                    </li>
                    <li>
                         <Link to="/ticket-refused">Ticket Refused</Link>
                    </li>
                    </> : null }

                    { role === 'Technician' ?
                    <>
                    <li>
                         <Link to="/ticket-tech">Ticket Technician</Link>
                    </li>
                    </> : null }
               </ul>
          </div>
          </>
     )
}


export default Sidebar