
import { useCart } from "./CartContext";

function Card1(props) {
    const {cart,addToCart} = useCart(); 
    const showcart = () => {
        console.log(cart);
    };
    return (
        <div className="card1">
            <img className="card1-image" src={props.pic} alt={props.title} />
            <p className="card1-title">{props.title}</p>
            <p className="card1-price">{props.price}VND</p>
        </div>
    );
}

export default Card1;