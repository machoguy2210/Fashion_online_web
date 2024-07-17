import React, { useState, useEffect } from "react";
import axios from "axios";
import { useProduct } from "../ProductContext";

function ProductDetail ({ productId, onClose, onSave }) {
    const { products } = useProduct();
    const [product, setProduct] = useState(null);
    //const [imageLinks, setImageLinks] = useState([]);

    useEffect(() => {
        setProduct(products.find(p => p._id === productId));
    }, [products, productId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleLinkChange = (e, index) => {
        const { value } = e.target;
        const newLinks = [...product.image_link];
        newLinks[index] = value;
        setProduct(prevState => ({
            ...prevState,
            imgae_link: newLinks
        }));
        //const newImageLinks = [...imageLinks];
        //newImageLinks[index] = value;
        //setImageLinks(newImageLinks);
    };

    const handleColorChange = (e, index) => {
        const { value } = e.target;
        const newColors = [...product.color];
        newColors[index] = value;
        setProduct(prevState => ({
            ...prevState,
            color: newColors
        }));
        updateProductTypes(newColors, product.size);
    };

    const handleSizeChange = (e, index) => {
        const { value } = e.target;
        const newSizes = [...product.size];
        newSizes[index] = value;
        setProduct(prevState => ({
            ...prevState,
            size: newSizes
        }));
        updateProductTypes(product.color, newSizes);
    };

    const updateProductTypes = (colors, sizes) => {
        const newProductTypes = [];
        colors.forEach(color => {
            sizes.forEach(size => {
                const existingType = product.type.find(type => type.color === color && type.size === size);
                if (!existingType) {
                    newProductTypes.push({
                        color,
                        size,
                        quantity: 0 
                    });
                }
            });
        });
        setProduct(prevState => ({
            ...prevState,
            type: newProductTypes
        }));
    };

    const handleProductTypeChange = (e, index) => {
        const { value } = e.target;
        const newProductTypes = [...product.type];
        newProductTypes[index].quantity = value;
        setProduct(prevState => ({
            ...prevState,
            type: newProductTypes
        }));
    };

    const handleAdd = (arrayName) => {
        setProduct(prevState => ({
            ...prevState,
            [arrayName]: [...prevState[arrayName], '']
        }));
    };

    const handleRemove = (arrayName, index) => {
        const newArray = [...product[arrayName]];
        newArray.splice(index, 1);
        setProduct(prevState => ({
            ...prevState,
            [arrayName]: newArray
        }));
    };

    const handleSave = () => {
        axios.post(`http://localhost:3001/update-product/${productId}`, product)
            .then(response => {
                if (response.data.status === 'success') {
                    onSave();
                    onClose();
                }
            })
            .catch(error => console.error(error));
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="product-details">
            <h2>Thông tin chi tiết sản phẩm</h2><br/>
            <label className="demuc">Tên sản phẩm: 
                <input style={{width:"70%", marginLeft:"5px"}} type="text" name="product_name" value={product.product_name} onChange={handleInputChange}/>
            </label>
            <label className="demuc">Link hình ảnh:
                {product.image_link.map((link, index) => (
                    <div className="linkanhx" key={index}>
                        <input type="text" value={link} onChange={(e) => handleLinkChange(e, index)}/>
                        <div>
                        {link && <img src={link} style={{ maxWidth: '100px', maxHeight: 'auto' }} />}
                        <button type="button" onClick={() => handleRemove('image_link', index)}>Xóa</button>
                        </div>
                    </div>
                ))}
                <button type="button" onClick={() => handleAdd('image_link')}>Thêm link</button>
            </label>
            <label className="demuc">Giá:
                <input style={{marginLeft:"5px"}} type="number" name="price" value={product.price} onChange={handleInputChange}/>
            </label>
            <label className="demuc">Màu sắc:
                {product.color.map((color, index) => (
                    <div key={index}>
                        <input style={{marginRight:"5px", marginBottom: "5px"}} type="text" value={color} onChange={(e) => handleColorChange(e, index)}/>
                        <button type="button" onClick={() => handleRemove('color', index)}>Xóa</button>
                    </div>
                ))}
                <button type="button" onClick={() => handleAdd('color')}>Thêm màu</button>
            </label>
            <label className="demuc">Kích thước:
                {product.size.map((size, index) => (
                    <div key={index}>
                        <input style={{marginRight:"5px", marginBottom: "5px"}} type="text" value={size} onChange={(e) => handleSizeChange(e, index)}/>
                        <button type="button" onClick={() => handleRemove('size', index)}>Xóa</button>
                    </div>
                ))}
                <button type="button" onClick={() => handleAdd('size')}>Thêm kích thước</button>
            </label>
            <label className="demuc">Phân loại sản phẩm:
                {product.type.map((type, index) => (
                    <div className="plspct" key={index}>
                        <span>{type.color} - {type.size}</span>
                        <input style={{marginRight:"5px", marginLeft: "5px"}} type="number" value={type.quantity} onChange={(e) => handleProductTypeChange(e, index)}/>
                        <button type="button" onClick={() => handleRemove('type', index)}>Xóa</button>
                    </div>
                ))}
                <button style={{marginTop:"5px"}} type="button" onClick={() => handleAdd('type')}>Thêm loại</button>
            </label>
            <label className="demuc">Tổng số lượng:
                <input style={{marginLeft: "5px"}} type="number" name="quantity" value={product.quantity} onChange={handleInputChange}/>
            </label>
            <label className="demuc">Mô tả:
                <textarea style={{marginLeft: "5px"}} name="description" value={product.description} onChange={handleInputChange}/>
            </label>
            <label className="demuc">Đánh giá:
                <input style={{marginLeft: "5px"}} type="number" name="rating" value={product.rating} onChange={handleInputChange}/>
            </label>
            <label className="demuc">Doanh thu:
                <input style={{marginLeft: "5px"}} type="number" name="revenue" value={product.revenue} onChange={handleInputChange}/>
            </label>
            <label className="demuc">Số lượng đã bán:
                <input style={{marginLeft: "5px"}} type="number" name="sold_quantity" value={product.sold_quantity} onChange={handleInputChange}/>
            </label>
            <label className="demuc">Danh mục:
                <input style={{marginLeft: "5px"}} type="text" name="category" value={product.category} onChange={handleInputChange}/>
            </label>
            <div className="demuc">
                <button className="nutcuoi" onClick={handleSave}>Lưu</button>
                <button className="nutcuoi" style={{marginLeft: "5px"}} onClick={onClose}>Hủy</button>
            </div>
        </div>
    );
}

export default ProductDetail;