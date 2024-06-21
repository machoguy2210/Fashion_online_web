import { useEffect, useState } from "react";
import { useCart } from "./CartContext";
import { useProduct } from "../ProductContext";
import axios from "axios";
import QrCode from "qrcode.react";
import { Link } from "react-router-dom";
import { TiDelete } from "react-icons/ti";

function Cart() {   

    const {cart, setCart} = useCart();
    const {products} = useProduct();

    const [money, setMoney] = useState(0);
    let money1 = 21000;
    let message = "Thanh toan don hang";

    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
  
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
    
    // Calculate CRC
    const crc_result = crc16_ccitt(input_data);
    input_data += crc_result;
    

    return (
        <div id="cart-container">
            <div id="cart-product-container">
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
                <div id="cart-form">
                    <h3>Thông tin đặt hàng</h3>
                    <h5>Tổng số tiền: </h5>
                    <h5>{money}</h5>
                    <form>
                        <input type="text" placeholder="Họ và tên" />
                        <input type="text" placeholder="Số nhà, Đường,..." />
                        <input type="text" placeholder="Số điện thoại" />
                        <p>Phương thức thanh toán</p>
                        <div>
                            <select
                                className="form-select form-select-sm mb-3"
                                id="city"
                                aria-label=".form-select-sm"
                                value={selectedCity}
                                onChange={handleCityChange}
                            >
                                <option value="" selected>Chọn tỉnh thành</option>
                                {cities.map(city => (
                                <option key={city.Id} value={city.Id}>{city.Name}</option>
                                ))}
                            </select>
                        
                            <select
                                className="form-select form-select-sm mb-3"
                                id="district"
                                aria-label=".form-select-sm"
                                value={selectedDistrict}
                                onChange={handleDistrictChange}
                                disabled={districts.length === 0}
                            >
                                <option value="" selected>Chọn quận huyện</option>
                                {districts.map(district => (
                                <option key={district.Id} value={district.Id}>{district.Name}</option>
                                ))}
                            </select>
                            <select
                                className="form-select form-select-sm"
                                id="ward"
                                aria-label=".form-select-sm"
                                disabled={wards.length === 0}
                            >
                                <option value="" selected>Chọn phường xã</option>
                                {wards.map(ward => (
                                <option key={ward.Id} value={ward.Id}>{ward.Name}</option>
                                ))}
                            </select>
                            </div>
                    </form>
                </div>
                <div id="cart-qr-payment">
                    {//<QrCode value={`2|99||Dao Tan Binh||0|0|${money}|${message}|transfer_myqr|81898628`}/> <br/> <br/>
                    }

                    <QrCode value={input_data} />
                    
                </div>
            </div>
        </div>
    )
}

export default Cart;
