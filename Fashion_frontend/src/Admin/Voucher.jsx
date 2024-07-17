import axios from "axios";
import { useEffect, useState } from "react";


function Voucher() {

    const [vouchers, setVouchers] = useState([]);

    const [newVoucher, setNewVoucher] = useState({
        condition: null,
        value: null,
        quantity_remain: null,
        used_quantity: 0
    });

    const [showindex, setShowIndex] = useState(null);

    const [editValues, setEditValues] = useState({});

  const showChange = (index) => {
    setShowIndex(index);
    setEditValues(vouchers[index]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditValues({
      ...editValues,
      [name]: value,
    });
  };


    useEffect(() => {
        axios.get('http://localhost:3001/api/vouchers/getall')
            .then((response) => {
                setVouchers(response.data);
            })
            .catch((err) => {
                console.log(err);
            })
    });

    const addNewVoucher = () => {
        if (newVoucher.condition === null || newVoucher.value === null || newVoucher.quantity_remain === null) {
            console.log(newVoucher);
            alert("Please fill in all fields");
            return;
        }
        else {
            console.log(newVoucher);
            axios.post('http://localhost:3001/api/vouchers/add', newVoucher)
                .then((response) => {
                    setVoucher([...voucher, response.data.voucher]);
                })
                .catch((err) => {
                    console.log(err);
                })
        }

    }

    const changeProperties = (e) => {
        const {name, value} = e.target;
        setNewVoucher({
            ...newVoucher,
            [name]: value
        });
    }

    const changeVoucher = (index) => {
        const updatedVouchers = vouchers.map((voucher, i) =>
            i === index ? { ...voucher, ...editValues } : voucher
          );
        setVouchers(updatedVouchers);
        setShowIndex(null);
        axios.post(`http://localhost:3001/api/vouchers/update/${editValues._id}`, editValues)
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
            })
    }



    return (
        <div>
            <h1>Voucher</h1>
            <button onClick={addNewVoucher}>Add Voucher</button>
            <div>
                <label>Condition</label>
                <input type="number" name="condition" onChange={changeProperties}/>
                <label>Discount</label>
                <input type="number" name="value" onChange={changeProperties}/>
                <label>Quantity-Remaining</label>
                <input type="number" name="quantity_remain" onChange={changeProperties}/>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>VoucherID</th>
                        <th>Condition</th>
                        <th>Discount</th>
                        <th>Quantity-Remaining</th>
                        <th>Used-Quantity</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {vouchers.map((voucher,index) => (
                        <tr key={index}>
                            <td>{voucher._id}</td>
                            <td>{voucher.condition}</td>
                            <td>{voucher.value}</td>
                            <td>{voucher.quantity_remain}</td>
                            <td>{voucher.used_quantity}</td>
                            <td><button onClick={() => showChange(index)}>Change</button>
                                { showindex === index &&
                                    <div style={{position: "relative", zIndex: "500"}}>
                                        <input type="number" name="condition" placeholder="Condition" value={editValues.condition} onChange={handleInputChange}/>
                                        <input type="number" name="value" placeholder="Discount" value={editValues.value} onChange={handleInputChange}/>
                                        <input type="number" name="quantity_remain" placeholder="Quantity-Remaining" value={editValues.quantity_remain} onChange={handleInputChange}/>
                                        <button onClick={changeVoucher}>Save</button>
                                    </div>
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Voucher;