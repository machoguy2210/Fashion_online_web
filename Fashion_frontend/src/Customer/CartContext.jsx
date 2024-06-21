import React, { createContext, useState, useContext, useEffect} from "react";
const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState(() => {
        const temp = JSON.parse(localStorage.getItem("cart"))
        if (temp !== null) return temp;
        else return [];
    });
    const addToCart = (product) => {
        setCart([...cart, product]);
    };
    const removeFromCart = (product) => {
        setCart(cart.filter((item) => item.id !== product.id));
    };

    useEffect(() => {
        if (cart.length > 0) localStorage.setItem('cart', JSON.stringify(cart));
    },[cart]);

    return (
        <CartContext.Provider value={{cart, setCart, addToCart, removeFromCart}}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
}