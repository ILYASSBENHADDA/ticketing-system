import React from 'react'
import { Route, Redirect } from 'react-router-dom'


const ProtectedEmpRouter = ({ isAuth, role, component: Component, ...rest }) => {
     return (
          <Route
               {...rest}
               render={() => {
                    if(isAuth && role === 'Employee') {
                         return <Component/>
                    } else {
                         return (
                              <Redirect to='/login' />
                         )
                    }

                    // return ( isAuth ? <Component/> : <Redirect to='/login' /> )
               }}
          />
     )
}


export default ProtectedEmpRouter