import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProduct } from '../ProductContext';
import { useCart } from './CartContext';
import { FaHeart } from "react-icons/fa6";

const ProductDetail = () => {
    const {products} = useProduct();
    const {cart, addToCart} = useCart();
    const { id } = useParams();
    const product = products.find(p => p._id === id);
    const [color, setColor] = useState(null);
    const [size, setSize] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const quantityref = useRef(null);

    useEffect(() => {
        if (products.length > 0 && product !== undefined)
            if (product.quantity === 0) {
            var buttons = document.getElementsByClassName('SP-button');
            for (var i = 0; i < buttons.length; i++) {
                buttons[i].disabled = true;
            }
        }
    },[products])

    useEffect(() => {
        if (size !== null && color !== null) {
            const remain_quantity = product.type.find(t => t.color === color && t.size === size).quantity;
            if (remain_quantity === 0) {
                var buttons = document.getElementsByClassName('SP-button');
                for (var i = 0; i < buttons.length; i++) {
                    buttons[i].disabled = true;
                }
            }
            else {
                var buttons = document.getElementsByClassName('SP-button');
                for (var i = 0; i < buttons.length; i++) {
                    buttons[i].disabled = false;
                }
            }
        }
    })

    const changeColor = (e) => {
        setColor(e.target.value);
    };

    const changeSize = (e) => {
        setSize(e.target.value);
    };

    const changeQuantity = (e) => {
        const k = parseInt(e.target.value);
        if (color === null || size === null) {alert('Vui lòng chọn màu và size!'); quantityref.current.value = 1; return;}
        else {
            const remain_quantity = product.type.find(t => t.color === color && t.size === size).quantity;
            console.log(remain_quantity);
            if (k > 0 && k <= remain_quantity) setQuantity((pre) => k);
            else {setQuantity(1);
                if(e.target.value !== '') quantityref.current.value = 1; }
        }
    };

    const decreaseCounter = () => {
        if (color === null || size === null) {alert('Vui lòng chọn màu và size!'); quantityref.current.value = 1; return;}
        else {
            setQuantity((pre) => {
                if (pre > 1) return (pre - 1);
                else return 1;    
            });
        }
    }
    const increaseCounter = () => {
        if (color === null || size === null) {alert('Vui lòng chọn màu và size!'); quantityref.current.value = 1; return;}
        else {
            const remain_quantity = product.type.find(t => t.color === color && t.size === size).quantity;
            setQuantity((pre) => {
                if (pre + 1 > remain_quantity) return remain_quantity;
                else return (pre+1);
            });
        }
    }

    useEffect(() => {
        if (quantityref.current !== null)  quantityref.current.value = parseInt(quantity);
    },[quantity]);

    const addProduct = () => {
        if (color !== null && size !== null) addToCart({productID: product._id, color: color, size: size, quantity: quantity, name: product.product_name, image: product.image_link[0], price: product.price, description: product.description});
        else alert('Vui lòng chọn màu và size!');
    };


    if (!product) {return <h2>Không tìm thấy sản phẩm!</h2>;}
    return (
        <> 
            <div id='link-path'><pre>Trang chủ    /   {product.category}    /     {product.product_name}</pre></div>
            <div className="SP-main">
                <img src={product.image_link[0]}/>
                <div className="SP-in4">
                    <h1>{product.product_name}</h1>
                    <br/>
                    <p>Mã sản phẩm: {product._id}</p>
                    <p>Giá: {product.price}₫</p>
                    <p>Màu sắc: {product.color.map((c, index) => 
                    (<span key={index}><input name='color' className='SP-button-color' type='radio' value={c} onChange={changeColor}/><label>{c}</label></span>))}</p>
                    <p>Size: {product.size.map((s, index) => 
                    (<span key={index}><input name='size' type='radio' className='SP-button-color' value={s} onChange={changeSize}/><label>{s}</label></span>))}</p>
                    <div className='SP-counter'>
                        <pre>Số lượng:   </pre>
                        <button onClick={decreaseCounter} className='SP-button'>-</button>
                        <input ref={quantityref} type='number' defaultValue={quantity} onChange={changeQuantity}/>
                        <button onClick={increaseCounter} className='SP-button'>+</button>
                    </div>
                    <button className='SP-button-love' type="submit"><FaHeart/></button>
                    <br/>
                    <button className='SP-button' onClick={addProduct}>Thêm vào giỏ hàng</button>
                    <button className='SP-button' >Mua ngay</button>
                </div>
            </div>
            <div className="SP-mota">
                <h2>Mô tả sản phẩm</h2>
                <p>{product.description}</p>
            </div>
            <div className="SP-danhgia">
                <h2>Đánh giá của khách hàng</h2>
            </div>
            <div className="SP-splq">
                <h2>Các sản phẩm bạn có thể quan tâm</h2>
            </div>
            <br/>
            <br/>
        </>
    );
};

export default ProductDetail;
