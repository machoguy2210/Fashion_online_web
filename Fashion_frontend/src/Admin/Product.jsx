import axios from "axios"
import React, { useEffect, useState } from "react"
import { useProduct } from "../ProductContext";

function Product() {

    const {products} = useProduct();
    const [image, setImage] = useState([]);
    const [productName, setProductName] = useState(null);
    const [price, setPrice] = useState(0);
    const [size, setSize] = useState([]);
    const [color, setColor] = useState([]);
    const [type, setType] = useState([]);
    const [quantity, setQuantity] = useState(0);
    const [description, setDescription] = useState(null);
    const [rating, setRating] = useState(0);
    const [revenue, setRevenue] = useState(0);
    const [soldQuantity, setSoldQuantity] = useState(0);
    const [category, setCategory] = useState(null);


    const addProduct = () => {
        
    }

    return (
        <div>
            <h1>Product</h1>
            <button onClick={addProduct}>Add Product</button>
            <table>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Image</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Category</th>                    
                        <th>Detail</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td><img style={{height: "50px"}} src={product.image_link[0]} /></td>
                            <td>{product.product_name}</td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>  
                            <td><button>Detail</button></td>
                            <td><button>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Product