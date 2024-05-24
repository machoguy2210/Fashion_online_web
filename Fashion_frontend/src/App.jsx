import Customer from "./Customer"
import LoginPage from "./LoginPage"
import Admin from "./Admin"
import Test from "./test"
import { BrowserRouter, Routes, Route } from "react-router-dom"
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*"  element={<Customer/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/login" element={<LoginPage/> } />
        <Route path="/test" element= {<Test />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
