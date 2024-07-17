import { useNavigate } from "react-router-dom"
import { IoAnalyticsOutline } from "react-icons/io5";
import { FaUsers } from "react-icons/fa6";
import { GiClothes } from "react-icons/gi";
import { LuListOrdered } from "react-icons/lu";
import { PiTicketBold } from "react-icons/pi";

function SideBar() {

    const navigate = useNavigate();

    return (
        <div className="admin-sidebar">
            <div>
                <button 
                    onClick={() => navigate('user')}
                ><FaUsers/>Users</button>
                <button
                    onClick={() => navigate('products')}
                ><GiClothes/>Products</button>
                <button
                    onClick={() => navigate('orders')}
                ><LuListOrdered/>Orders</button>
                <button
                    onClick={() => navigate('vouchers')}
                ><PiTicketBold />Vouchers</button>
                <button
                    onClick={() => navigate('revenue')}
                ><IoAnalyticsOutline />Analytic</button>
            </div>

            <button>Log out</button>
        </div>
    )
}

export default SideBar