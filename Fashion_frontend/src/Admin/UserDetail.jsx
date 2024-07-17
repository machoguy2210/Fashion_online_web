import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Avatar from "../assets/Avatar.jpg"
import { useProduct } from '../ProductContext';

function UserDetail(props) {
    
    const user = props.user;
    const {products} = useProduct();
    const [favoriteProducts, setFavoriteProducts] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (products.length > 0 && user && user.favorite_products) {
            const fetchFavoriteProducts = async () => {
                const favoriteProducts = await Promise.all(
                    user.favorite_products.map(async (product_id) => {
                        const product = products.find((product) => product._id === product_id);
                        return product;
                    })
                );
                setFavoriteProducts(favoriteProducts.filter(Boolean));
            };
            fetchFavoriteProducts();
        }
    }, [products]);

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await axios.get(`http://localhost:3001/api/orders/get/${user._id}`);
            if (response.status === 200) setOrders(response.data);
            else alert('Internal server error');
        }
        fetchOrders();
    },[]);

    useEffect(() => {
        console.log(orders);
    }, [orders]);

    const CloseWindow = (e) => {
        if (e.target.id === "user-detail-container") {
            props.onClose();
        }
    }

    return (
        <div id="user-detail-container" onClick={CloseWindow}>
            <div id="user-detail-content">
                <button onClick={props.onClose}>Close</button>
                <h1>Chi tiết khách hàng</h1>
                <div id="user-information">
                    <img src={Avatar} />
                    <div>
                        <p>Email: {user.email}</p>
                        <p>Name: {user.name}</p>
                        <p>Phone: {user.phone}</p>
                    </div>
                </div>
                <h2>Sản phẩm yêu thích</h2>
                <div id="favorite-products" style={{display: "flex"}}>
                    {favoriteProducts.length === 0 ? <p>Không có sản phẩm yêu thích</p> :
                    favoriteProducts.map((product, index) => (
                        <div key={index} className="cardspp">
                            <img className="cardspp-image" src={product.image_link[0]} />
                            <p className="cardspp-title">{product.product_name}</p>
                            <p className="cardspp-price">{product.price}VND</p>
                        </div>
                    ))}
                </div>
                <h2>Đơn hàng</h2>
                <div id="orders">
                    <table>
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Payment</th>
                                <th>Date-Ordered</th>
                                <th>Date-Delievered</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{order.quantity}</td>
                                    <td>{order.cost}</td>
                                    <td>{order.status}</td>
                                    <td>{order.payment}</td>
                                    <td>{order.dateOrdered}</td>
                                    <td>{order.dateDelievery}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default UserDetail