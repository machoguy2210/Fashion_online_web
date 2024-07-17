import { useEffect, useState } from "react";
import { useCart } from "./CartContext";
import { useProduct } from "../ProductContext";
import axios from "axios";
import QrCode from "qrcode.react";
import { Link } from "react-router-dom";
import { TiDelete } from "react-icons/ti";
import { useUser } from "../UserContext";
import { Navigate } from "react-router-dom";

function Cart() {   

    const {cart, setCart} = useCart();
    const {products} = useProduct();
    const {user} = useUser();
    if (!user) {
        return <Navigate to="/login" />;
    }

    const [money, setMoney] = useState(0);
    let message = user.email;

    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [showQR, setShowQR] = useState(false);
  
    useEffect(() => {
      axios.get("https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json")
        .then(response => {
          setCities(response.data);
        })
        .catch(error => {
          console.error("Error fetching data: ", error);
        });
    }, []);

    useEffect(() => {
        let total = 0;
        cart.forEach(product => {
            total += product.price * product.quantity;
        });
        setMoney(total);
    }, [cart]);



  
    const handleCityChange = (event) => {
      const cityId = event.target.value;
      setSelectedCity(cityId);
      setSelectedDistrict("");
      setWards([]);
      if (cityId !== "") {
        const selectedCityData = cities.find(city => city.Id === cityId);
        setDistricts(selectedCityData.Districts);
      } else {
        setDistricts([]);
      }
    };
  
    const handleDistrictChange = (event) => {
      const districtId = event.target.value;
      setSelectedDistrict(districtId);
      if (districtId !== "") {
        const selectedDistrictData = districts.find(district => district.Id === districtId);
        setWards(selectedDistrictData.Wards);
      } else {
        setWards([]);
      }
    };

    const descrease = (index) => {
        const newCart = [...cart];
        if (newCart[index].quantity > 1) {
            newCart[index].quantity -= 1;
        } 
        setCart(newCart);
    }

    const increase = (index) => {
        const newCart = [...cart];
        const product = products.find(p => p._id === newCart[index].productID);
    
        if (!product) {
            console.error("Product not found");
            return;
        }
        else {
            console.log(product);
        }

        const productType = product.type.find(t => t.color === newCart[index].color && t.size === newCart[index].size);
        
        if (!productType) {
            console.error("Product type not found");
            return;
        }
        const remain_quantity = product.type.find(t => t.color === newCart[index].color && t.size === newCart[index].size).quantity;
        if (newCart[index].quantity + 1 > remain_quantity) newCart[index].quantity = remain_quantity;
        else 
        newCart[index].quantity += 1;
        setCart(newCart);
    }

    const deleteProduct = (index) => {
        const newCart = [...cart];
        newCart.splice(index, 1);
        setCart(newCart);
    }

    function crc16_ccitt(data) {
        // Tham số CRC-16-CCITT
        const polynomial = 0x1021;
        let crc = 0xFFFF;
    
        // Chuyển đổi chuỗi đầu vào thành bytes
        const bytesData = new TextEncoder().encode(data);
    
        // Xử lý từng byte
        for (let byte of bytesData) {
            crc ^= byte << 8;
            for (let i = 0; i < 8; i++) {
                if (crc & 0x8000) {
                    crc = (crc << 1) ^ polynomial;
                } else {
                    crc <<= 1;
                }
                crc &= 0xFFFF; // Đảm bảo CRC vẫn là giá trị 16-bit
            }
        }
    
        // Trả về CRC dưới dạng chuỗi thập lục phân
        return crc.toString(16).toUpperCase().padStart(4, '0');
    }

    let money_string = money.toString();
    // Input string
    let input_data = '00020101021138620010A00000072701320006970454011899MM24531M818986280208QRIBFTTA5303704540'+money_string.length+money_string+'5802VN62'+(23+message.length)+'0515MOMOW2W8189862808'+message.length.toString().padStart(2, '0')+message+'80039996304';
    //let input_data = '00020101021238560010A0000007270126000697041501121078739264260208QRIBFTTA5303704540'+money_string.length+money_string+'5802VN62'+(4+message.length).toString().padStart(2,'0')+'08'+message.length.toString().padStart(2, '0')+message+'6304'
    

    // Calculate CRC
    const crc_result = crc16_ccitt(input_data);
    input_data += crc_result;

    const createOrder = (event) => {
        event.preventDefault();
        if (window.confirm("Xác nhận đặt hàng?")) {
            const form = event.target;
            const data = new FormData(form);
            const order = {
                customer: {
                    accountID: user._id,
                    name: data.get("name"),
                    email: user.email,
                    address: data.get("address"),
                    phone: data.get("phone"),
                    city: cities.find(city => city.Id === data.get("city")).Name,
                    district: districts.find(district => district.Id === data.get("district")).Name,
                    ward: wards.find(ward => ward.Id === data.get("ward")).Name,
                },
                payment: data.get("payment-method"),
                products: cart,
                cost: money,
                voucherID: data.get("voucher"),
                status: "Đang chờ xác nhận",
                dateOrdered: new Date().toISOString(),
                dateDelivery: null
            }
            axios.post("http://localhost:3001/api/orders/new-order", order)
                .then(response => {
                    console.log(response.data);
                    localStorage.removeItem("cart");
                    if (data.get("payment-method") === "BANKING") {
                        setShowQR(true);
                    }
                    else {
                        alert("Đặt hàng thành công!");
                        setCart([]);
                    }
                })
                .catch(error => {
                    console.error("Error creating order: ", error);
                })
        }
    }
    
    const qrClick = () => {
        setShowQR(false);
        setCart([]);
    }

    return (
        <div id="cart-container">
            <div id="cart-product-container">
                <h2 style={{marginBottom: "50px"}}>Giỏ hàng của bạn</h2>
                {cart.map((product, index) => {
                    return <div className="cart-product" key={index}>
                        <TiDelete onClick={() => deleteProduct(index)} />
                        <Link to={`/products/${product.productID}`}><img src={product.image} /></Link>
                        <div>
                            <Link to={`/products/${product.productID}`}>
                                <h4>{product.name}</h4>
                            </Link>
                            <p>{product.description}</p>
                            <span >{product.color},{product.size}</span>
                            <p>{product.price}</p>
                            <div style={{display: "flex"}}>
                                <button onClick={() => descrease(index)}>-</button>
                                <p>{product.quantity}</p>
                                <button onClick={() => increase(index)}>+</button>
                            </div>
                        </div>
                    </div>
                })}
            </div>
            <div id="cart-form-container">
                {!showQR? <div id="cart-form">
                    <h3>Thông tin đặt hàng</h3>
                    <h5>Tổng số tiền: {money}</h5>
                    <form style={{display: "flex", flexDirection: "column", width: "100%"}} onSubmit={createOrder}>
                        <input name="name" type="text" placeholder="Họ và tên" required/>
                        <input name="address" type="text" placeholder="Số nhà, Đường,..." required/>
                        <input name="phone" type="tel" placeholder="Số điện thoại" required/>
                        <select name="payment-method" required>
                            <option value="">Chọn phương thức thanh toán</option>
                            <option value="cod">Thanh toán khi nhận hàng</option>
                            <option value="BANKING">Thanh toán qua QR code</option>
                        </select>
                        <div>
                            <select
                                id="city"
                                name="city"
                                value={selectedCity}
                                onChange={handleCityChange}
                                required
                            >
                                <option value="">Chọn tỉnh thành</option>
                                {cities.map(city => (
                                <option key={city.Id} value={city.Id}>{city.Name}</option>
                                ))}
                            </select>
                        
                            <select
                                id="district"
                                name="district"
                                value={selectedDistrict}
                                onChange={handleDistrictChange}
                                disabled={districts.length === 0}
                                required
                            >
                                <option value="">Chọn quận huyện</option>
                                {districts.map(district => (
                                <option key={district.Id} value={district.Id}>{district.Name}</option>
                                ))}
                            </select>
                            <select
                                id="ward"
                                name="ward"
                                disabled={wards.length === 0}
                                required
                            >
                                <option value="">Chọn phường xã</option>
                                {wards.map(ward => (
                                <option key={ward.Id} value={ward.Id}>{ward.Name}</option>
                                ))}
                            </select>
                        </div>
                        {//<input name="voucher" type="text" placeholder="Voucher (nếu có)"/>
                        }
                        <button type="submit">Đặt hàng</button>
                    </form>
                </div> :
                <div id="cart-qr-payment">
                    <h3>Thanh toán qua QR code</h3>
                    <QrCode value={input_data} />
                    <button onClick={qrClick}>Xác nhận đã thanh toán</button>
                </div>
                }
            </div>
        </div>
    )
}

export default Cart;
