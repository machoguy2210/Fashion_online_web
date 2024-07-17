import Customer from "./Customer"
import LoginPage from "./LoginPage"
import Admin from "./Admin"
import Test from "./test"
import VerifyAccount from "./verifyAccount"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { UserProvider } from "./UserContext"
import { ProductProvider } from "./ProductContext"

function App() {

  return (
    <BrowserRouter>
      <UserProvider>
        <ProductProvider>
          <Routes>
            <Route path="/*"  element={<Customer/>} />
            <Route path="/admin/*"  element={<Admin/>} />
            <Route path="/login" element={<LoginPage/> } />
            <Route path="/register" element={<LoginPage/> } />
            <Route path="/test" element= {<Test />} />
            <Route path="/verify" element={<VerifyAccount />} />
          </Routes>
        </ProductProvider>
      </UserProvider>
      </BrowserRouter>
  )
}

export default App
