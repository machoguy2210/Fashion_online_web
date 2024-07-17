import { CiCirclePlus } from "react-icons/ci";
import { useUser } from "../UserContext";
import { useProduct } from "../ProductContext";
import axios from "axios";
import { useEffect,useState } from "react";
import { Navigate } from "react-router-dom";
import ProductReview from "./ProductReview";

function Profile() {
    const {user} = useUser();
    if (!user) {
        return <Navigate to="/login" />;
    }

    const {products} = useProduct();
    const [orders, setOrders] = useState([]);
    const [favorite, setFavorite] = useState([]);
    const [profile, setProfile] = useState({
        name: user.name,
        phone: user.phone
    });
    const [isChangePassword, setIsChangePassword] = useState(false);
    const [orderDetail, setOrderDetail] = useState(null);
    const [showPart, setShowPart] = useState('profile');

    const getOrders = async () => {
        const response = await axios.get(`http://localhost:3001/api/orders/get/${user._id}`);
        if (response.status === 200) setOrders(response.data);
        else alert('Internal server error');
    }



    useEffect(()=> {
        getOrders();
    },[]);

    useEffect(() => {
        if (products.length > 0 && user && user.favorite_products) {
            const fetchFavoriteProducts = async () => {
                const favoriteProducts = await Promise.all(
                    user.favorite_products.map(async (product_id) => {
                        const product = products.find((product) => product._id === product_id);
                        return product;
                    })
                );
                setFavorite(favoriteProducts.filter(Boolean));
            };
            fetchFavoriteProducts();
        }
    }, [products, user]);

    const saveProfile = async () => {
        if (profile.name === '' || profile.phone === '') alert('Vui lòng nhập đầy đủ thông tin')
        else if (profile.phone.length !== 10) alert('Số điện thoại không hợp lệ')
        else if (profile.name === user.name && profile.phone === user.phone) alert('Không có gì thay đổi');
        else
        {
            const response = await axios.put(`http://localhost:3001/api/users/update/${user._id}`, profile);
            if (response.status === 200) {
                alert('Cập nhật thành công');
                localStorage.setItem('user', JSON.stringify(response.data));
                window.location.reload();
            }
            else alert('Internal server error');
        }
    }

    const changePassword = async (e) => {
        e.preventDefault();
        let currentpassword = e.target[0].value;
        let newpassword = e.target[1].value;
        let renewpassword = e.target[2].value;
        if (newpassword !== renewpassword) alert('Mật khẩu mới không khớp');
        else {
            const response = await axios.put(`http://localhost:3001/api/users/changepassword/${user._id}`, {currentpassword, newpassword});
            if (response.status === 200) {
                alert(response.data.message);
            }
            else alert('Internal server error');
        }

    }
    
    return (
        <div>
            <div id='link-path'><pre>Trang chủ    /   Tài khoản</pre></div>
            <div className='profile'>
                <div className='left-profile'>
                    <h2 style={{marginBottom: "20px"}}>Tài khoản</h2>
                    <div>
                        <div onClick={() => setShowPart('profile')} style={{cursor: "pointer", marginBottom: "30px"}}><CiCirclePlus/>Thông tin tài khoản</div>
                        <div onClick={() => setShowPart('orders')} style={{cursor: "pointer", marginBottom: "30px"}}><CiCirclePlus/>Đơn hàng của tôi</div>
                        <div onClick={() => setShowPart('favorites')} style={{cursor: "pointer", marginBottom: "30px"}}><CiCirclePlus/>Danh sách sản phẩm yêu thích</div>
                    </div>
                </div>
                <div className='right-profile'>
                    { showPart === 'profile' &&
                    <div>
                        <h2>Thông tin tài khoản</h2>
                        <div>
                            <div>Email:   {user.email}</div><br/>
                            <input type='text' id='name' value={profile.name} onChange={(e) => setProfile(pre => ({...pre, name: e.target.value }))}></input><br/>
                            <input type="tel" id='phone' value={profile.phone} onChange={(e) => setProfile(pre => ({...pre, phone: e.target.value }))}></input><br/>
                            <button onClick={saveProfile}>Lưu</button><br/>
                            <button onClick={() => setIsChangePassword(true)}>Đổi mật khẩu</button>
                            {(isChangePassword === true) && <form onSubmit={(e) => changePassword(e)}>
                                <input type='text' placeholder='Mật khẩu cũ' required></input><br/>
                                <input type='text' placeholder='Mật khẩu mới' minLength={6} required></input><br/>
                                <input type='text' placeholder='Nhập lại mật khẩu mới' minLength={6} required></input>
                                <button type="submit">Save</button>
                                <button onClick={() => setIsChangePassword(false)}>Cancel</button>
                            </form>}
                        </div>
                    </div>
                    }
                    { showPart === 'orders' &&
                    <div style={{width: "100%"}}>
                        <h2>Đơn hàng của tôi</h2>
                        {orders.map((order, index) => {
                            
                            return (
                                <div key={index} style={{border: "2px solid black", width: "1000px", borderRadius: "10px", marginBottom: "50px"}}>
                                    <div>Mã đơn hàng: {order._id}</div>
                                    <div style={{display: "flex"}}>
                                        {order.products.map((product, index) => {
                                            const productDetails = products.find((p) => p._id === product.productID);
                                            return (
                                                <div key={index} className="cardspp">
                                                    <img className="cardspp-image" src={productDetails.image_link[0]} />
                                                    <p className="cardspp-title">{productDetails.product_name}</p>
                                                    <p className="cardspp-price">Size: {product.size}</p>
                                                    <p className="cardspp-price">Màu: {product.color}</p>
                                                    <p className="cardspp-price">Số lượng: {product.quantity}</p>
                                                    <p className="cardspp-price">{product.price}VND</p>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div>Trạng thái: {order.status}</div>
                                    <div>Tổng tiền: {order.cost}</div>
                                    <button onClick={() => setOrderDetail(order)} disabled={order.status !== "Hoàn tất"}>Đánh giá</button>
                                </div>
                            )
                        })}
                        {(orderDetail !== null) && <ProductReview order={orderDetail} onClose={() => setOrderDetail(null)}/>}
                    </div>
                    }
                    { showPart === 'favorites' &&
                    <div>
                        <h2>Danh sách sản phẩm yêu thích</h2>
                        {favorite.map((product, index) => {
                            return (
                                <div key={favorite._id} className="cardsppp">
                                    <img className="cardsppp-image" src={product.image_link}/>
                                    <p className="cardsppp-title">{product.product_name}</p>
                                    <p className="cardsppp-price">{product.price}₫</p>
                                </div>
                            )
                        })}
                    </div>
                    }
                </div>
            </div>

        </div>
    )
}

export default Profile;