import Card from "./Card"
import aokhoac from '../assets/aokhoac.jpg'
import aosomi from '../assets/aosomi.jpg'
import aothun from '../assets/aothun.jpg'
import aopolo from '../assets/aopolo.jpg'
import quanshort from '../assets/quanshort.jpg'
import quanjeans from '../assets/quanjeans.jpg'
import quanau from '../assets/quanau.jpg'
import giaytay from '../assets/giaytay.jpg'
import giaythethao from '../assets/giaythethao.jpg'
import giayluoi from '../assets/giayluoi.jpg'
import { Link, Outlet } from "react-router-dom";
import background from '../assets/background_homepage.jpeg'

function ProductList() {
    return (
        <div className="product_list">  
            <img style={{width: "100vw", margin: "0px 0px 100px 0px"}} src={background}></img>
            <Link className="Link-tag" to="/collections/" style={{textDecoration: "none", color: "black"}}><h1>Danh mục sản phẩm</h1></Link>
            <div>
                <Link className="Link-tag" to="collections/ao-khoac" ><Card pic={aokhoac } title="Áo khoác" /></Link>
                <Link className="Link-tag" to="collections/ao-so-mi"><Card pic={aosomi} title="Áo sơ mi" /></Link>
                <Link className="Link-tag" to="collections/ao-thun"><Card pic={aothun} title="Áo thun" /></Link>
                <Link className="Link-tag" to="collections/ao-polo"><Card pic={aopolo} title="Áo Polo" /></Link>
                <Link className="Link-tag" to="collections/quan-short"><Card pic={quanshort} title="Quần Short" /></Link>
                <Link className="Link-tag" to="collections/quan-jeans"><Card pic={quanjeans} title="Quần Jeans" /></Link>
                <Link className="Link-tag" to="collections/quan-au"><Card pic={quanau} title="Quần Âu" /></Link>
                <Link className="Link-tag" to="collections/giay-tay"><Card pic={giaytay} title="Giày Tây" /></Link>
                <Link className="Link-tag" to="collections/giay-the-thao"><Card pic={giaythethao} title="Giày thể thao" /></Link>
                <Link className="Link-tag" to="collections/giay-luoi"><Card pic={giayluoi} title="Giày lười" /></Link>
            </div>
        </div>
    )
}

export default ProductList