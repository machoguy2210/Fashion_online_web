import React, { createContext, useState, useContext, useEffect} from "react";
const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState(() => {
        const temp = JSON.parse(localStorage.getItem("cart"))
        if (temp !== null) return temp;
        else return [];
    });
    const addToCart = (product) => {
        const productIndex = cart.findIndex((item) => ((item._id === product._id) && (item.size === product.size) && (item.color === product.color)));
        if (productIndex === -1) {
            setCart([...cart, product]);
        } else {
            const newCart = [...cart];
            newCart[productIndex].quantity += 1;
            setCart(newCart);
        }
    };

    useEffect(() => {
        if (cart.length > 0) localStorage.setItem('cart', JSON.stringify(cart));
        else localStorage.removeItem('cart');
    },[cart]);

    return (
        <CartContext.Provider value={{cart, setCart, addToCart}}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
}