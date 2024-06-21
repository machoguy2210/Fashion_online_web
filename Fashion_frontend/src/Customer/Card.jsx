import { IoMdArrowForward } from "react-icons/io";

function Card(props)
{
    return(
        <div className="card" style={{backgroundImage: `url(${props.pic})`}}>
            <div>
                <h2 className="card-title">{props.title}</h2>
                <IoMdArrowForward className="card-icon"/>
            </div>
        </div>
    );
}

export default Card 