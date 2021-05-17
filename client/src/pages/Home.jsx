import React from "react"
import Nav from './partials/Nav'
import Sidebar from "./partials/Sidebar"

function Home() {

     return (
          <>
          <Nav/>
          <div id="wrapper">

          <Sidebar/>

          <div id="page-content-wrapper">
               <div className="container-fluid">
                    <h1>Home</h1>

                    
               </div>
          </div>
          </div>
          </>
     )
}

export default Home