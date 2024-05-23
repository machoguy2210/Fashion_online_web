import Card from "./Card"
import picture from '../assets/clothes.jpg'
import { Link,Outlet } from "react-router-dom";

function ProductList() {
    return (
        <>  
            <img src="https://i.pinimg.com/originals/e3/ac/3a/e3ac3aff37d67c2647b5246822bb56bc.jpg"></img>
            <Link to="/collections/"><h1 className="product_list">Danh mục sản phẩm</h1></Link>
            <div>
                <Link to="collections/ao-khoac" ><Card pic={picture} title="Áo khoác" /></Link>
                <Link to="collections/ao-so-mi"><Card pic={picture} title="Áo sơ mi" /></Link>
                <Link to="collections/ao-thun"><Card pic={picture} title="Áo thun" /></Link>
                <Link to="collections/ao-polo"><Card pic={picture} title="Áo Polo" /></Link>
                <Link to="collections/quan-short"><Card pic={picture} title="Quần Short" /></Link>
                <Link to="collections/quan-jeans"><Card pic={picture} title="Quần Jeans" /></Link>
                <Link to="collections/quan-au"><Card pic={picture} title="Quần Âu" /></Link>
                <Link to="collections/giay-tay"><Card pic={picture} title="Giày Tây" /></Link>
                <Link to="collections/giay-the-thao"><Card pic={picture} title="Giày thể thao" /></Link>
            </div>
        </>
    )
}

export default ProductList