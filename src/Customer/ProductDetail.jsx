import React from 'react';
import { useParams } from 'react-router-dom';
import { useProduct } from './ProductContext';
import { useCart } from './CartContext';

const ProductDetail = () => {
    const {products} = useProduct();
    const {cart, addToCart} = useCart();
    const {id} = useParams();
    const product = products.find(product => product.id === parseInt(id));

    return (
        <>       
            <div>{`Trang chủ   /   ${product.category}   /   ${product.name}`}</div>     
            <div className='product_detail'>
                <div className='left_product_detail'>
                    <img src={product.image} alt={product.name} />
                </div>
                <div className='right_product_detail'>
                    <h3>{product.name}</h3>
                    <pre>Mã sản phẩm: <b>{product.id}</b>          Tình trạng:  <b>Còn hàng</b>       Thương hiệu:  <b>Torano</b>  </pre>
                    <div>
                        <span>Giá: <span className='price'>{product.price}</span>đ</span>
                        <span>Màu sắc: </span>
                        
                        <button onClick={() => addToCart(product)}>Thêm vào giỏ hàng</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetail;
