import Customer from "./Customer"
import LoginPage from "./LoginPage"
import Admin from "./Admin"
import Test from "./test"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { UserProvider } from "./UserContext"
function App() {

  return (
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/*"  element={<Customer/>} />
            <Route path="/admin" element={<Admin/>} />
            <Route path="/login" element={<LoginPage/> } />
            <Route path="/test" element= {<Test />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
  )
}

export default App
