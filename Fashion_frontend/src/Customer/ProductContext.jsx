import React, {createContext, useState, useContext} from "react";
const ProductContext = createContext();
import pic from '../assets/clothes.jpg'

export const ProductProvider = ({children}) => {
    const [products, setProducts] = useState([
        {id:1, name: "Áo thun", image: pic, price: 100000, category: 'ao-thun'},
        {id:2, name: "Áo sơ mi", image: pic, price: 200000, category: 'ao-so-mi'},
        {id:3, name: "Áo khoác", image: pic, price: 300000, category: 'ao-khoac'},    
        {id:4, name: "Quần jean", image: pic, price: 400000, category: 'quan-jeans'},
        {id:5, name: "Quần kaki", image: pic, price: 500000, category: 'quan-kaki'},
        {id:6, name: "Giày thể thao", image: pic, price: 600000, category: 'giay-the-thao'},
        {id:7, name: "Giày lười", image: pic, price: 700000, category: 'giay-luoi'},
    ]);

    const fetchProducts = async () => {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
    }

    return (
        <ProductContext.Provider value={{products, setProducts, fetchProducts}}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProduct = () => {
    return useContext(ProductContext);
}




