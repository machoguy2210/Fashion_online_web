import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProduct } from '../ProductContext';
import { useUser } from '../UserContext';
import { useCart } from './CartContext';
import { FaHeart } from "react-icons/fa6";
import { IoPersonCircleSharp } from "react-icons/io5";
import { CiStar } from "react-icons/ci";
import axios from 'axios';

const ProductDetail = () => {
    const {user} = useUser();
    const {products} = useProduct();
    const {cart, addToCart} = useCart();
    const { id } = useParams();
    const product = products.find(p => p._id === id);
    const [color, setColor] = useState(null);
    const [size, setSize] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [reviews, setReviews] = useState([]);
    const [isFavorite, setIsFavorite] = useState(false);

    const quantityref = useRef(null);

    useEffect(() => {
        if (user !== null) {
            if (user.favorite_products.find(p => p === id) !== undefined) setIsFavorite(true);
            else setIsFavorite(false);
        }
    }, []);

    const toggleFavorite = () => {
        if (isFavorite) {
            axios.post('http://localhost:3001/api/users/remove-favorite', { userId: user._id, id })
                .then(response => {
                    if (response.data.status === 'success') {
                        setIsFavorite(false);
                        localStorage.setItem('user', JSON.stringify(response.data.user));
                        location.reload();
                    }
                })
                .catch(error => console.error(error));
        } else {
            axios.post('http://localhost:3001/api/users/add-favorite', { userId: user._id, id })
                .then(response => {
                    if (response.data.status === 'success') {
                        setIsFavorite(true);
                        localStorage.setItem('user', JSON.stringify(response.data.user));
                    }
                })
                .catch(error => console.error(error));
        }
    };

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
    },[color, size]);

    useEffect(() => {
        axios.get(`http://localhost:3001/api/reviews/get/${id}`)
            .then(response => {
                if (response.status === 200) setReviews(response.data.reviews);
            })
    },[id]);

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
        if (color !== null && size !== null) {
            alert('Đã thêm vào giỏ hàng!');
            addToCart({productID: product._id, color: color, size: size, quantity: quantity, name: product.product_name, image: product.image_link[0], price: product.price, description: product.description});
        }
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
                    <button className={isFavorite? 'SP-button-loved' : 'SP-button-love'}  type="submit" onClick={toggleFavorite} disabled={user === null}><FaHeart/></button>
                    <br/>
                    <button className='SP-button' onClick={addProduct} disabled={user === null}>Thêm vào giỏ hàng</button>
                </div>
            </div>
            <div className="SP-mota">
                <h2>Mô tả sản phẩm</h2>
                <p>{product.description}</p>
            </div>
            <div className="SP-danhgia">
                <h2>Đánh giá của khách hàng</h2>
                <div>
                    {reviews.length === 0 ? <p>Chưa có đánh giá nào!</p> :
                    reviews.map((review, index) => (
                        <div key={index} style={{display: "flex"}}>   
                            <IoPersonCircleSharp fontSize={"3em"} />
                            <div>
                                <div>User</div>
                                <span>{review.rating}<CiStar/> / 5<CiStar/></span>
                                <p>{review.comment}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <br/>
            <br/>
        </>
    );
};

export default ProductDetail;
