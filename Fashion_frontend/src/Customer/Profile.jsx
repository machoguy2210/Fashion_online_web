import { CiCirclePlus } from "react-icons/ci";
import { useUser } from "../UserContext";
import { useProduct } from "../ProductContext";
import axios from "axios";
import { useEffect,useState } from "react";

function Profile() {
    const {user} = useUser();
    const {products} = useProduct();
    const [orders, setOrders] = useState([]);
    const [favorite, setFavorite] = useState([]);

    const getOrders = async () => {
        const response = await axios.get(`http://localhost:3001/api/orders/${user._id}`);
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

    const changeName = () => {
        document.getElementById('name').innerHTML = 'Họ và tên:               <input type="text"></input>';
    }

    const changePhone = () => {
        document.getElementById('phone').innerHTML = 'Số điện thoại:               <input type="text"></input>';
    }
    
    return (
        <div>
            <div id='link-path'><pre>Trang chủ    /   Tài khoản</pre></div>
            <div className='profile'>
                <div className='left-profile'>
                    <h2>Tài khoản</h2>
                    <div>
                        <ul><CiCirclePlus/>Thông tin tài khoản</ul>
                        <ul><CiCirclePlus/>Đơn hàng của tôi</ul>
                        <ul><CiCirclePlus/>Danh sách sản phẩm yêu thích</ul>
                    </div>
                </div>
                <div className='right-profile'>
                    <div>
                        <h2>Thông tin tài khoản</h2>
                        <div>
                            <div>Email:   {user.email}</div><br/>
                            <div>
                                <span>Họ và tên: </span>
                                <span id='name'>{user.name}</span>
                                <button onClick={changeName}>Sửa</button>
                            </div>
                            <div>
                                <span>Số điện thoại: </span>
                                <span>{user.phone}</span>
                                <button onClick={changePhone}>Sửa</button>
                            </div>
                            <button>Đổi mật khẩu</button>
                        </div>
                    </div>
                    <div>
                        <h2>Đơn hàng của tôi</h2>
                        {orders.map((order, index) => {
                            return (
                                <div key={index}>
                                    <div>Mã đơn hàng: {order._id}</div>
                                    <div>Ngày đặt hàng: {order.dateOrdered}</div>
                                    <div>Trạng thái: {order.status}</div>
                                    <div>Tổng tiền: {order.cost}</div>
                                </div>
                            )
                        })}
                    </div>
                    <div>
                        <h2>Danh sách sản phẩm yêu thích</h2>
                        {favorite.map((product, index) => {
                            return (
                                <div key={index}>
                                    <div>{product.product_name}</div>
                                    <div>{product.price}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Profile;