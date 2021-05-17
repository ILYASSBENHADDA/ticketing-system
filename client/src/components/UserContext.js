import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const UserContext = createContext(null)


export function UserProvider({ children }) {

     const [isAuth, setIsAuth] = useState(false)
     const [role, setRole] = useState('')

     useEffect(()=> {
          axios.get('http://localhost:4000').then((response) => {
               console.log(response.data)
               setIsAuth(response.data.isAuthenticated)
               setRole(response.data.role)
          })
          .catch(err => { console.log(err) })
     }, [])


     return (
          <>
               <UserContext.Provider value={{isAuth: isAuth, role: role}}>
                    {children}
               </UserContext.Provider>
          </>
     )
}