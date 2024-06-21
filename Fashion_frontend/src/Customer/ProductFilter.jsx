import { useParams, Link } from 'react-router-dom';
import Card1 from './Card1';
import React, { useState, useEffect } from 'react';
import { useProduct } from '../ProductContext';

function ProductFilter() {
    const {products} = useProduct();
    const [sub_product, setSub_product] = useState([]);
    const {category} = useParams();
    useEffect(() => {
        if (category !== undefined) {
            const filter_product = products.filter((product) => product.category === category);
            setSub_product(filter_product);
        }
        else {
            setSub_product(products);
        }
    }, [category,products]);

    let minPrice = 0;
    let maxPrice = 0;
    const handleMinPriceChange = (e) => {
        minPrice = e.target.value;
    }
    const handleMaxPriceChange = (e) => {
        maxPrice =  e.target.value;
    }
    const filterpro = () => {
        if (minPrice > maxPrice || minPrice < 0) alert('Invalid input');
        else {
        const filter_product = products.filter((product) => product.price >= minPrice && product.price <= maxPrice);
        setSub_product(filter_product);
        console.log(sub_product);
        }
    }
    return (
        <>  
            <div id='link-path'><pre>Trang chủ    /   {category}</pre></div>
            <div className='product_filter'>
                <div className='left_product_filter'>
                    <h1>Bộ lọc</h1>
                    <Link className='Link-tag' to="/collections/"> 
                        <h2>Danh mục sản phẩm</h2>
                    </Link>
                    <div>
                        <div className='product-type'>
                            <span>Áo nam</span>
                            <div className='product-category'>
                                <Link className='Link-tag' to="/collections/ao-khoac"><div className='inner-product-category'>Áo khoác</div></Link>
                                <Link className='Link-tag' to="/collections/ao-so-mi"><div className='inner-product-category'>Áo sơ mi</div></Link>
                                <Link className='Link-tag' to="/collections/ao-thun"><div className='inner-product-category'>Áo thun</div></Link>
                                <Link className='Link-tag' to="/collections/ao-polo"><div className='inner-product-category'>Áo polo</div></Link>
                            </div>
                        </div>
                        <div className='product-type'>
                            <span>Quần nam</span>
                            <div className='product-category'>
                            <Link className='Link-tag' to='/collections/quan-short'><div>Quần short</div></Link>
                                <Link className='Link-tag' to='/collections/quan-jeans'><div>Quần jean</div></Link>
                                <Link className='Link-tag' to='/collections/quan-au'>
                                    <div className='inner-product-category'>Quần âu</div>
                                </Link>
                            </div>
                        </div>
                        <div className='product-type'>
                            <span>Giày nam</span>
                            <div className='product-category'>
                                <Link className='Link-tag' to='/collections/giay-tay'>
                                    <div className='inner-product-category'>Giày tây</div>
                                </Link>
                                <Link className='Link-tag' to='/collections/giay-the-thao'>
                                    <div className='inner-product-category'>Giày thể thao</div>
                                </Link>
                                <Link className='Link-tag' to='/collections/giay-luoi'>
                                    <div className='inner-product-category'>Giày lười</div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3>Khoảng giá</h3>
                        <div id='price_filter'>
                            <input type='number' placeholder='Từ' onChange={handleMinPriceChange}/>
                            <input type='number' placeholder='Đến' onChange={handleMaxPriceChange}/>
                            <button onClick={filterpro}>Lọc</button>
                        </div>
                    </div>
                </div>
                <div className='right_product_filter'>
                    <h1>Danh sách sản phẩm</h1>
                    {sub_product? sub_product.map((product,index) => 
                        <Link className='Link-tag' key={index} to={`/products/${product._id}`}>
                            <Card1 title={product.product_name} pic={product.image_link} price={product.price}/>
                        </Link>
                    ) : null}
                </div>
            </div>
        </>
    );
}

export default ProductFilter;