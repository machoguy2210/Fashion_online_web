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
                    <div className='inner_right_product_detail'>
                        <div className='title_product_detail'>
                            <h3>{product.name}</h3>
                            <pre>Mã sản phẩm: <b>{product.id}</b>          Tình trạng:  <b>Còn hàng</b>       Thương hiệu:  <b>Torano</b>  </pre>
                        </div>
                        <div className='option_product_detail'>
                            <div className='detail_price_container'>
                                <div className='detail_option_title'>Giá:</div>
                                <div className='detail_price'>{product.price}đ</div>
                            </div>
                            <div className='detail_color_container'>
                                <div className='detail_option_title'>Màu sắc:</div>
                                <div className='detail_color'>{product.color}</div> 
                            </div>
                            <div className='detail_size_container'>
                                <div className='detail_option_title'>Kích cỡ:</div>
                                <div className='detail_size'>{product.size}</div>
                            </div>
                            <div className='detail_quantity_container'>
                                <div className='detail_option_title'>Số lượng:</div>
                                <div className='detail_quantity'>
                                    <button>-</button>
                                    <input type='text' value='1' />
                                    <button>+</button>
                                </div>
                            </div>                                       
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetail;
