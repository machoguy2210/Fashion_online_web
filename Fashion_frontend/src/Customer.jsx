import Navbar from "./Customer/navbar";
import ProductList from "./Customer/ProductList";
import ProductFilter from "./Customer/ProductFilter";
import ProductDetail from "./Customer/ProductDetail";
import { CartProvider } from "./Customer/CartContext";
import { ProductProvider } from "./Customer/ProductContext";
import { Routes,Route } from "react-router-dom";
import { useUser } from "./UserContext";

function Customer() {

  const {user} = useUser();
  console.log(user);
  
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