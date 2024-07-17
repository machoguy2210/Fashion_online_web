import { Navigate } from "react-router-dom";
import { useUser } from "./UserContext";
import { Link } from "react-router-dom";
import SideBar from "./Admin/Sidebar";
import Users from "./Admin/Users";
import Product from "./Admin/Product";
import Voucher from "./Admin/Voucher";
import Revenue from "./Admin/Revenue";
import AdminOrder from "./Admin/AdminOrder";
import { Routes, Route } from "react-router-dom";
import "./Admin/Admin.css"

function Admin() {
  const {user} = useUser();
  if(!user) return <Navigate to="/login" /> 


  return (
    <>
      <div id="top-bar-admin-page">
      <Link className='Link-tag' to="/admin"><img src="https://theme.hstatic.net/200000690725/1001078549/14/logo.png?v=363" style={{maxHeight: "50px"}} /></Link>
        <h2>Welcome {user.name}</h2>
      </div>
      <div id="admin-page-container">
        <div id="left-admin-page-container">
          <SideBar />
        </div>
        <div id="right-admin-page-container">
          <Routes>
            <Route path="/user" element={<Users />} />
            <Route path="/products" element={<Product />} />
            <Route path="/vouchers" element={<Voucher />} />
            <Route path="/revenue" element={<Revenue />} />
            <Route path="/orders" element={<AdminOrder />} />
          </Routes>
        </div>
      </div>

    </>
  );
}

export default Admin;