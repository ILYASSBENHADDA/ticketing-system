import React from 'react'
import { Route, Redirect } from 'react-router-dom'

function ProtectedAuthRouter({ isAuth, component: Component, ...rest}) {
     return (
          <Route
               {...rest}
               render={() => !isAuth ? <Component/> : <Redirect to='/' />}
          />
     )
}

export default ProtectedAuthRouter