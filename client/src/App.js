import Routers from "./routes/Routes"
import { UserProvider } from "./components/UserContext"

function App() {
  return (
    <>
      <UserProvider>
        <Routers></Routers>
      </UserProvider>
    </>
  )
}

export default App