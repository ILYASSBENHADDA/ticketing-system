import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from "../../components/UserContext"


function Nav() {

     const {role, isAuth} = useContext(UserContext)


     return (
          <>
          <nav className="navbar navbar-expand-md navbar-dark bg-dark">
               <Link to="/" className="navbar-brand"><b>TICKTING SYSTEM</b></Link>
               <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar7">
               <span className="navbar-toggler-icon"></span>
               </button>
               <div className="navbar-collapse collapse justify-content-stretch" id="navbar7">
                    <ul className="navbar-nav ml-auto">
                         { isAuth ? <> 
                         <li>
                              <Link className="nav-link"> <b> { role === 'Employee' ? 'Employee' : (role === 'Technician') ? 'Technician' : 'Admin' } Mode </b></Link> 
                         </li>
                         <li>
                              <Link className="nav-link" to="/logout"><i className="fas fa-sign-out-alt mr-1"></i>log Out</Link> 
                         </li>
                         </> :
                         <li>
                              <Link className="nav-link" to="/login"><i className="fas fa-sign-in-alt mr-1"></i> Log In</Link> 
                         </li>
                         }
                    </ul>
               </div>
          </nav>
          </>
     )
}


export default Nav