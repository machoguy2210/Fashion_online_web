import { Navigate } from "react-router-dom";
import { useUser } from "./UserContext";
import { Link } from "react-router-dom";
import SideBar from "./Admin/Sidebar";
import Users from "./Admin/Users";
import Product from "./Admin/Product";

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
          <Users />
          <Product />
        </div>
      </div>

    </>
  );
}

export default Admin;