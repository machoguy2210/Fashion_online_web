import axios from "axios";
import { useState, useEffect } from "react";
import { IoMdArrowDropright } from "react-icons/io";
import { IoMdArrowDropleft } from "react-icons/io";
import { useProduct } from "../ProductContext";
import { FaSearch } from 'react-icons/fa';
import { FaPlus } from "react-icons/fa";
import ProductDetail from "./Product_Detail";

function Product()
{
    const {products, setProducts } = useProduct();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddingProduct, setIsAddingProduct] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [newProduct, setNewProduct] = useState({
        product_name: '',
        image_link: [],
        price: 0,
        color: [],
        size: [],
        type: [],
        quantity: 0,
        description: '',
        rating: 0,
        revenue: 0,
        sold_quantity: 0,
        category: ''
    });
    const productsPerPage = 5;
    const sortedProducts = products.sort((a, b) => a.category.localeCompare(b.category));

    const filteredProducts = sortedProducts.filter(p => 
        p.product_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p._id.includes(searchTerm)
    );

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const handlePrevPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage-1, 1));
    };
    const handleNextPage = () => {
        setCurrentPage(prevPage => Math.min(prevPage + 1, Math.ceil(filteredProducts.length / productsPerPage)));
    };

    const handleRemoveProduct = (productid) => {
        if (window.confirm('Are you sure you want to remove this product?'))
            axios.post('http://localhost:3001/remove-product', { productid })
                .then(response => {
                    if (response.data.status === 'success') {
                        setProducts(products.filter(p => p._id !== productid));
                    }
                })
                .catch(error => console.error(error));
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAddProduct = () => {
        setIsAddingProduct(true);
    };

    const handleAddLink = () => {
        setNewProduct(prevState => ({
            ...prevState,
            image_link: [...prevState.image_link, ""]
        }));
    };

    const handleLinkChange = (e, index) => {
        const { value } = e.target;
        const newLinks = [...newProduct.image_link];
        newLinks[index] = value;
        setNewProduct(prevState => ({
            ...prevState,
            image_link: newLinks
        }));
    };

    const handleAddColor = () => {
        setNewProduct(prevState => ({
            ...prevState,
            color: [...prevState.color, ""]
        }));
    };

    const handleColorChange = (e, index) => {
        const { value } = e.target;
        const newColors = [...newProduct.color];
        newColors[index] = value;
        setNewProduct(prevState => ({
            ...prevState,
            color: newColors
        }));
    };

    const handleAddSize = () => {
        setNewProduct(prevState => ({
            ...prevState,
            size: [...prevState.size, ""]
        }));
    };

    const handleSizeChange = (e, index) => {
        const { value } = e.target;
        const newSizes = [...newProduct.size];
        newSizes[index] = value;
        setNewProduct(prevState => ({
            ...prevState,
            size: newSizes
        }));
    };

    const generateProductTypes = () => {
        const productTypes = [];
        newProduct.color.forEach(color => {
            newProduct.size.forEach(size => {
                productTypes.push({ color, size, quantity: 0 });
            });
        });
        setNewProduct(prevState => ({
            ...prevState,
            type: productTypes
        }));
    };

    const handleProductTypeChange = (e, index) => {
        const { value } = e.target;
        const newProductTypes = [...newProduct.type];
        newProductTypes[index].quantity = parseInt(value);
        setNewProduct(prevState => ({
            ...prevState,
            type: newProductTypes
        }));
    };

    const handleSaveProduct = () => {
        axios.post('http://localhost:3001/add-product', newProduct)
            .then(response => {
                if (response.data.status === 'success') {
                    location.reload();
                }
            })
            .catch(error => console.error(error));
    };

    const handleViewDetails = (productId) => {
        setSelectedProductId(productId);
    };

    const handleCloseDetails = () => {
        setSelectedProductId(null);
    };

    const handleSaveDetails = () => {
        // Reload the products from the server or update the products state
        location.reload();
    };

    return(
    <>
    {isAddingProduct ? 
        (<div className="add-product-form">
            <h2>Thêm sản phẩm mới</h2>
            <br/>
            <p style={{"fontSize":"20px"}}>Nhập thông tin sản phẩm mới:</p>
            <br/>
          <div className="add-pro">
            <label>Tên: <input type="text" name="product_name" 
                value={newProduct.name} onChange={handleInputChange}/></label>
            <label>Link ảnh: {newProduct.image_link.map((link, index) => (
                <input key={index} type="text" name="link" value={link} 
                onChange={(e) => handleLinkChange(e, index)}/>))}
                <button onClick={handleAddLink}>Thêm link</button></label>
            <label>Giá: <input type="number" name="price" 
                value={newProduct.price} onChange={handleInputChange}/></label>
            <label>Màu sắc: {newProduct.color.map((color, index) => (
                <input key={index} type="text" name="color" value={color} 
                onChange={(e) => handleColorChange(e, index)}/>))}
                <button onClick={handleAddColor}>Thêm màu</button></label>
            <label>Size: {newProduct.size.map((size, index) => (
                <input key={index} type="text" name="size" value={size} 
                onChange={(e) => handleSizeChange(e, index)}/>))}
                <button onClick={handleAddSize}>Thêm size</button></label>
          <div className="adprbt">
            <button onClick={generateProductTypes}>Phân loại sản phẩm</button>
          </div>
            <label>Số lượng mỗi loại: <div style={{"height":"5px"}}/>{newProduct.type.map((type, index) => (
                <div className="typ" key={index}><span>{type.color} - {type.size} : </span>
                <input type="number" name="quantity" value={type.quantity} 
                onChange={(e) => handleProductTypeChange(e, index)}/></div>))}</label>
            <label>Tổng số lượng: <input type="text" name="quantity" 
                value={newProduct.quantity} onChange={handleInputChange}/></label>
            <label>Mô tả: <textarea name="description" 
                value={newProduct.description} onChange={handleInputChange}/></label>
            <label>Danh mục: <input type="text" name="category" 
                value={newProduct.category} onChange={handleInputChange}/>
                <br/><span style={{"fontSize":"15px", "color":"grey"}}>(Danh mục gồm: ao-khoac, ao-polo, ao-thun, ao-so-mi, quan-jeans, quan-short, quan-au, giay-tay, giay-the-thao)</span></label>
          <div className="adprbt">
            <button onClick={handleSaveProduct}>Tạo</button>
            <button onClick={() => setIsAddingProduct(false)}>Hủy</button>
          </div>
          </div>  
        </div>) 
    : 
        (selectedProductId ? 
            <ProductDetail productId={selectedProductId} onClose={handleCloseDetails} onSave={handleSaveDetails}/> 
        :
        <>
                <h1>Danh sách sản phẩm</h1><br/>
                <div className="sead">
                    <div className="search-container">
                        <input type="text" placeholder="Search" className="tim-kiem" onChange={handleSearchChange} />
                        <div className="search-icon"><FaSearch /></div>
                    </div>
                    <button onClick={handleAddProduct}><FaPlus /> Thêm sản phẩm mới</button>
                </div>
                <table>
                <thead>
                    <tr>
                    <th>STT</th>
                    <th>Hình ảnh</th>
                    <th>Mã sản phẩm</th>
                    <th>Tên sản phẩm</th>
                    <th>Category</th>
                    <th>Giá</th>
                    <th>Chỉnh sửa</th>
                    <th>Xóa</th>
                    </tr>
                </thead>
                <tbody>
                {currentProducts.map((p, index) => (
                    <tr key={p._id}>
                    <td className="stt">{indexOfFirstProduct+index+1}</td>
                    <td><img className="table-img" style={{height: "100px"}} src={p.image_link[0]}/></td>
                    <td>{p._id}</td>
                    <td className="productname">{p.product_name}</td>
                    <td>{p.category}</td>
                    <td>{p.price}</td>
                    <td className="ttct"><div onClick={() => handleViewDetails(p._id)}>Chi tiết</div></td>
                    <td className="ttct"><div onClick={() => handleRemoveProduct(p._id)}>Xóa</div></td>
                    </tr>
                ))}
                </tbody>
                </table>
                <div className="pagination">
                    <button className="arrow" onClick={handlePrevPage} disabled={currentPage === 1}>
                    <IoMdArrowDropleft style={{"marginBottom":"-3px"}}/></button>
                    <span> {currentPage} </span>
                    <button className="arrow" onClick={handleNextPage} disabled={currentPage === Math.ceil(
                    products.length/productsPerPage)}><IoMdArrowDropright style={{"marginBottom":"-3px"}}/></button>
                </div>
        </>)
    }
    </>)
}

export default Product