import Navbar from "./Customer/navbar";
import ProductList from "./Customer/ProductList";
import ProductFilter from "./Customer/ProductFilter";
import ProductDetail from "./Customer/ProductDetail";
import Footer from "./Customer/Footer";
import Profile from "./Customer/Profile";
import Cart from "./Customer/Cart";
import { CartProvider } from "./Customer/CartContext";
import { Routes,Route } from "react-router-dom";
import { useUser } from "./UserContext";
import { useEffect } from "react";

function Customer() {

  
  return (
    <CartProvider>
        <Navbar />
        <div style={{height: "50px"}}></div>
        <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/collections/:category?" element={<ProductFilter />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<Cart/>} />
        </Routes>
        <Footer />
    </CartProvider>
  );
}

export default Customer;