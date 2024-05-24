import Navbar from "./Customer/navbar";
import ProductList from "./Customer/ProductList";
import ProductFilter from "./Customer/ProductFilter";
import ProductDetail from "./Customer/ProductDetail";
import { CartProvider } from "./Customer/CartContext";
import { ProductProvider } from "./Customer/ProductContext";
import { Routes,Route } from "react-router-dom";


function Customer() {
  
  return (
    <CartProvider>
      <ProductProvider>
        <Navbar />
        <div style={{height: "50px"}}></div>
        <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/collections/:category?" element={<ProductFilter />} />
            <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
      </ProductProvider>
    </CartProvider>
  );
}

export default Customer;