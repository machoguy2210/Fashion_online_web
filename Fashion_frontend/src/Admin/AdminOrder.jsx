import { useState, useEffect } from "react";
import axios from "axios";
import { useProduct } from "../ProductContext";
import { TbArrowBackUp } from "react-icons/tb";

function AdminOrder()
{
    const [dh, setDh] = useState(null);
    const {products} = useProduct();
    const [ldh, setLdh] = useState("cxn");
    const [ord, setOrd] = useState(null);
    const [orders, setOrders] = useState([]);
    const [status, setStatus] = useState(null);
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/orders/getall');
                if (response.status === 200) {
                    setOrders(response.data);
                } else {
                    console.error('Failed to fetch products:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchOrders();
    },[]);

    useEffect(() => {
        console.log(orders);
    }, [orders]);

    const handleViewO = (orderid) => {
        const od = orders.find(o=>o._id===orderid)
        setDh(orderid);
        setOrd(od);
        setStatus(od.status);
    }

    useEffect(()=>{
        console.log(dh)
    },[dh]);

    const handleChangeStatus = async (newStatus) => {
        try {
            const response = await axios.put(`http://localhost:3001/orders/${ord._id}/status`, { status: newStatus });
            if (response.data.status === 'success') {
                // Cập nhật trạng thái đơn hàng trong state
                setOrders(orders.map(o => o._id === ord._id ? { ...o, status: newStatus } : o));
                setOrd({ ...ord, status: newStatus });
                alert('Cập nhật trạng thái thành công');
            } else {
                alert('Cập nhật trạng thái thất bại');
            }
        } catch (error) {
            console.error('Error updating order status:', error);
            alert('Đã có lỗi xảy ra khi cập nhật trạng thái.');
        }
    };
    

    return(
        <>{dh ? 
            (<div className="adorxtt">
            <div className="adorttdh">
                <h1>Thông tin đơn hàng</h1>
                <button onClick={()=>{setDh(null); setOrd(null);}}><TbArrowBackUp /></button>
            </div>
            <div className="ps">
                <p>Mã đơn hàng: {ord._id}</p>
                <p>Mã khách hàng: {ord.customer.accountID}</p>
                <p>Tổng số lượng sản phẩm: {ord.quantity}</p>
                <p>Tổng giá trị đơn hàng: {ord.cost}đ</p>
                <p>Mã Voucher: {ord.voucherID}</p>
                <p>Phương thức thanh toán: {ord.payment}</p>
                <div style={{display: "flex"}}>
                    <p>Trạng thái: </p>
                    <div style={{fontWeight: "bold", marginLeft: "5px"}}>{ord.status}</div>
                </div>
                {status==="Đang chờ xác nhận" && 
                    <div className="cnbton">
                        <button onClick={()=>handleChangeStatus("Đang chờ vận chuyển")}>Xác nhận</button>
                        <button onClick={()=>handleChangeStatus("Đơn hủy")}>Hủy đơn</button>
                </div>}
                {status==="Đang chờ vận chuyển" && 
                    <div className="cnbton">
                        <button onClick={()=>handleChangeStatus("Đang vận chuyển")}>Cập nhật</button>
                </div>}
                {status==="Đang vận chuyển" && 
                    <div className="cnbton">
                        <button onClick={()=>handleChangeStatus("Hoàn tất")}>Cập nhật</button>
                        <button onClick={()=>handleChangeStatus("Đơn hoàn")}>Đơn hoàn</button>
                </div>}
                <p>Ngày đặt: {ord.dateOrdered}</p>
                <p>Ngày giao: {ord.dateDelivery}</p><br/>
            </div>
            <h2>Thông tin người nhận</h2>
            <div className="adorttnn">
                <p>Họ và tên: {ord.customer.name}</p>
                <p>Số điện thoại: {ord.customer.phone}</p>
                <p>Địa chỉ: {ord.customer.address}</p>
            </div>
            <h2>Thông tin sản phẩm</h2>
            <div>
                {ord.products.map((sp, index) => {
                    const p = products.find(p=>p._id===sp.productID);
                    return(
                    <div className="cardgh" key={index}>
                        <img src={p.image_link[0]}/>
                        <div className="cardghh-text">
                            <p style={{"height" : "40px"}}>{p.product_name}</p>
                            <p>Màu: {sp.color}</p>
                            <p>Size: {sp.size}</p>
                            <p>Số lượng: {sp.quantity}</p>
                            <p>Giá: {p.price}₫</p>
                        </div>
                    </div>)})}
            </div>
            </div>) 
            :
            (<>
            <div className="adorderbut">
                <button className="dhbutton" onClick={()=>setLdh("cxn")}>Chờ xác nhận</button>
                <button className="dhbutton" onClick={()=>setLdh("cvc")}>Chờ vận chuyển</button>
                <button className="dhbutton" onClick={()=>setLdh("dvc")}>Đang vận chuyển</button>
                <button className="dhbutton" onClick={()=>setLdh("ht")}>Hoàn tất</button>
                <button className="dhbutton" onClick={()=>setLdh("dh")}>Đơn hoàn</button>
                <button className="dhbutton" onClick={()=>setLdh("dhh")}>Đơn hủy</button>
            </div>
            <h1 style={{textAlign : "center"}}>Danh sách đơn hàng</h1>
            { ldh==="cxn" &&
            <table>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Mã đơn</th>
                        <th>Tên người nhận</th>
                        <th>SĐT người nhận</th>
                        <th>Tổng đơn</th>
                        <th>Phương thức thanh toán</th>
                        <th>Ngày đặt</th>
                    </tr>
                </thead>
                <tbody>
                {orders.filter(od=>od.status==="Đang chờ xác nhận").map((o, index) => 
                    <tr key={index}>
                        <td className="stt">{index+1}</td>
                        <td className="adormadh" onClick={()=>handleViewO(o._id)}>{o._id}</td>
                        <td>{o.customer.name}</td>
                        <td className="stt">{o.customer.phone}</td>
                        <td>{o.cost}</td>
                        <td className="stt" style={{width: "120px"}}>{o.payment}</td>
                        <td>{o.dateOrdered}</td>
                   </tr>)}
                </tbody>
            </table>}

            { ldh==="cvc" &&
            <table>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Mã đơn</th>
                        <th>Tên người nhận</th>
                        <th>SĐT người nhận</th>
                        <th>Tổng đơn</th>
                        <th>Phương thức thanh toán</th>
                        <th>Ngày đặt</th>
                    </tr>
                </thead>
                <tbody>
                {orders.filter(od=>od.status==="Đang chờ vận chuyển").map((o, index) => 
                    <tr key={index}>
                        <td className="stt">{index+1}</td>
                        <td className="adormadh" onClick={()=>handleViewO(o._id)}>{o._id}</td>
                        <td>{o.customer.name}</td>
                        <td className="stt">{o.customer.phone}</td>
                        <td>{o.cost}</td>
                        <td className="stt" style={{width: "120px"}}>{o.payment}</td>
                        <td>{o.dateOrdered}</td>
                   </tr>)}
                </tbody>
            </table>}

            { ldh==="dvc" &&
            <table>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Mã đơn</th>
                        <th>Tên người nhận</th>
                        <th>SĐT người nhận</th>
                        <th>Tổng đơn</th>
                        <th>Phương thức thanh toán</th>
                        <th>Ngày đặt</th>
                    </tr>
                </thead>
                <tbody>
                {orders.filter(od=>od.status==="Đang vận chuyển").map((o, index) => 
                    <tr key={index}>
                        <td className="stt">{index+1}</td>
                        <td className="adormadh" onClick={()=>handleViewO(o._id)}>{o._id}</td>
                        <td>{o.customer.name}</td>
                        <td className="stt">{o.customer.phone}</td>
                        <td>{o.cost}</td>
                        <td className="stt" style={{width: "120px"}}>{o.payment}</td>
                        <td>{o.dateOrdered}</td>
                   </tr>)}
                </tbody>
            </table>}

            { ldh==="ht" &&
            <table>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Mã đơn</th>
                        <th>Tên người nhận</th>
                        <th>SĐT người nhận</th>
                        <th>Tổng đơn</th>
                        <th>Phương thức thanh toán</th>
                        <th>Ngày đặt</th>
                    </tr>
                </thead>
                <tbody>
                {orders.filter(od=>od.status==="Hoàn tất").map((o, index) => 
                    <tr key={index}>
                        <td className="stt">{index+1}</td>
                        <td className="adormadh" onClick={()=>handleViewO(o._id)}>{o._id}</td>
                        <td>{o.customer.name}</td>
                        <td className="stt">{o.customer.phone}</td>
                        <td>{o.cost}</td>
                        <td className="stt" style={{width: "120px"}}>{o.payment}</td>
                        <td>{o.dateOrdered}</td>
                   </tr>)}
                </tbody>
            </table>}

            { ldh==="dh" &&
            <table>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Mã đơn</th>
                        <th>Tên người nhận</th>
                        <th>SĐT người nhận</th>
                        <th>Tổng đơn</th>
                        <th>Phương thức thanh toán</th>
                        <th>Ngày đặt</th>
                    </tr>
                </thead>
                <tbody>
                {orders.filter(od=>od.status==="Đơn hoàn").map((o, index) => 
                    <tr key={index}>
                        <td className="stt">{index+1}</td>
                        <td className="adormadh" onClick={()=>handleViewO(o._id)}>{o._id}</td>
                        <td>{o.customer.name}</td>
                        <td className="stt">{o.customer.phone}</td>
                        <td>{o.cost}</td>
                        <td className="stt" style={{width: "120px"}}>{o.payment}</td>
                        <td>{o.dateOrdered}</td>
                   </tr>)}
                </tbody>
            </table>}

            { ldh==="dhh" &&
            <table>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Mã đơn</th>
                        <th>Tên người nhận</th>
                        <th>SĐT người nhận</th>
                        <th>Tổng đơn</th>
                        <th>Phương thức thanh toán</th>
                        <th>Ngày đặt</th>
                    </tr>
                </thead>
                <tbody>
                {orders.filter(od=>od.status==="Đơn hủy").map((o, index) => 
                    <tr key={index}>
                        <td className="stt">{index+1}</td>
                        <td className="adormadh" onClick={()=>handleViewO(o._id)}>{o._id}</td>
                        <td>{o.customer.name}</td>
                        <td className="stt">{o.customer.phone}</td>
                        <td>{o.cost}</td>
                        <td className="stt" style={{width: "120px"}}>{o.payment}</td>
                        <td>{o.dateOrdered}</td>
                   </tr>)}
                </tbody>
            </table>}
            </>)
        }</>
    )
}

export default AdminOrder