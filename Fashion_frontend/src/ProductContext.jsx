import React, {createContext, useState, useEffect, useContext} from "react";
const ProductContext = createContext();
import axios from 'axios';

export const ProductProvider = ({children}) => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        const response = await axios.get('http://localhost:3001/api/products');
        if(response.status === 200){
            setProducts(response.data);
        }
    }

    useEffect(() => {        
        fetchProducts();
    }, []);

    return (
        <ProductContext.Provider value={{products, fetchProducts}}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProduct = () => {
    return useContext(ProductContext);
}




