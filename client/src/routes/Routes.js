import React, {useContext} from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import Login from '../pages/Login'
import Home from '../pages/Home'
import NotFound from '../pages/404'
import Register from '../pages/amdin/Register'
import Tickets from '../pages/employee/Tickets'
import Logout from '../pages/Logout'
import TicketList from '../pages/amdin/TicketList'
import Single from '../pages/amdin/Single'
import axios from 'axios'
import Closed from '../pages/amdin/Closed'
import Assigned from '../pages/amdin/Assigned'
import Refused from '../pages/amdin/Refused'
import TicketTech from '../pages/technician/TicketTech'
// Protected Routes
import ProtectedAuthRouter from './ProtectedAuthRouter'
import ProtectedAdminRouter from './ProtectedAdminRouter'
import ProtectedTechRouter from './ProtectedTechRouter'
import ProtectedEmpRouter from './ProtectedEmpRouter'
// User Context API
import { UserContext } from "../components/UserContext"

function Routes() {
     
     const {role, isAuth} = useContext(UserContext)

     
     return (
          <>
          <Router>
               <Switch>

                    {/* Global Routes */}
                    <Route exact path="/" component={Home}/>
                    <ProtectedAuthRouter path="/login" component={Login} isAuth={isAuth} />
                    <Route exact path="/logout" component={Logout}/>

                    {/* Admin Routes */}
                    <ProtectedAdminRouter path="/register-user" component={Register} isAuth={isAuth} role={role} />
                    <ProtectedAdminRouter path="/ticket-list" component={TicketList} isAuth={isAuth} role={role} />
                    <ProtectedAdminRouter path="/ticket-list=:id" component={Single} isAuth={isAuth} role={role} />
                    <ProtectedAdminRouter path="/ticket-closed" component={Closed} isAuth={isAuth} role={role} />
                    <ProtectedAdminRouter path="/ticket-assigned" component={Assigned} isAuth={isAuth} role={role} />
                    <ProtectedAdminRouter path="/ticket-refused" component={Refused} isAuth={isAuth} role={role} />

                    {/* Employee Routes */}
                    <ProtectedEmpRouter path="/create-ticket" component={Tickets} isAuth={isAuth} role={role} />

                    {/* Technician Routes */}
                    <ProtectedTechRouter path="/ticket-tech" component={TicketTech} isAuth={isAuth} role={role} />
               
                    <Route exact path="/404" component={NotFound}/>
                    <Redirect to="/404" />
               </Switch>
          </Router>
          </>
     )
}

export default Routes