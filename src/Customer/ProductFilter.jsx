import { useParams, Link } from 'react-router-dom';
import Card1 from './Card1';
import React, { useState, useEffect } from 'react';
import { useProduct } from './ProductContext';

function ProductFilter() {
    const {products} = useProduct();
    const [sub_product, setSub_product] = useState(products);
    const {category} = useParams();
    useEffect(() => {
        if (category !== undefined) {
            const filter_product = products.filter((product) => product.category === category);
            setSub_product(filter_product);
        }
    }, [category]);
    

    
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const handleMinPriceChange = (e) => {
        setMinPrice(p => e.target.value);
    }
    const handleMaxPriceChange = (e) => {
        setMaxPrice(p => e.target.value);
    }
    const filterpro = () => {
        if (minPrice > maxPrice || minPrice < 0) alert('Invalid input');
        else {
        const filter_product = product.filter((product) => product.price >= minPrice && product.price <= maxPrice);
        setSub_product(filter_product);
        console.log(sub_product);
        }
    }
    return (
            <div className='product_filter'>
                <div className='left_product_filter'>
                    <p style={{backgroundColor: '#fff256'}}>Bộ lọc</p>
                    <p>Danh mục sản phẩm</p>
                    <div>
                        <span>Áo nam</span>
                        <div>
                            <Link to="/collections/ao-thun"><div>Áo thun</div></Link>
                            <Link to="/collections/ao-so-mi"><div>Áo sơ mi</div></Link>
                            <Link to="/collections/ao-khoac"><div>Áo khoác</div></Link>
                        </div>
                    </div>
                    <div>
                        <span>Quần nam</span>
                        <div>
                            <Link to='/collections/quan-jeans'>
                                <div>Quần jean</div>
                            </Link>
                            <Link to='/collections/quan-kaki'>
                                <div>Quần kaki</div>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <span>Giày nam</span>
                        <div>
                            <Link to='/collections/giay-the-thao'>
                                <div>Giày thể thao</div>
                            </Link>
                            <Link to='/collections/giay-luoi'>
                                <div>Giày lười</div>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <h2>Khoảng giá</h2>
                        <div id='price_filter'>
                            <input type='number' placeholder='Từ' onChange={handleMinPriceChange}/>
                            <input type='number' placeholder='Đến' onChange={handleMaxPriceChange}/>
                            <button onClick={filterpro}>Lọc</button>
                        </div>
                    </div>
                </div>
                <div className='right_product_filter'>
                    <h1>Danh sách sản phẩm</h1>
                    {sub_product.map((product) => 
                        <Link key={product.id} to={`/products/${product.id}`}>
                            <Card1 title={product.name} pic={product.image} price={product.price}/>
                        </Link>
                    )}
                </div>
            </div>
    );
}

export default ProductFilter;