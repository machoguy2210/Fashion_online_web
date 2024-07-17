import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiSolidDiscount } from "react-icons/bi";

function VoucherList() {
    
    const [vouchers, setVouchers] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:3001/api/vouchers')
            .then((response) => {
                setVouchers(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    },[]);


    return (
        <div>
            <h1>Khuyến mãi</h1>
            <div id="voucher-list">
                {vouchers.map((voucher, index) => (
                    <div key={index} className="voucher-card">
                        <BiSolidDiscount className="voucher-image" />
                        <div>
                            <p>{voucher._id}</p>
                            <p>Giảm giá {voucher.value}</p>
                            <p>Áp dụng cho đơn hàng có giá trị trên {voucher.condition}</p>
                            <p>Số lượng còn lại: {voucher.quantity_remain}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default VoucherList;