import React, {useEffect, useState, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useUser } from '../UserContext';
import { FaSearch } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { RiShoppingBag4Line } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { IoPersonCircleOutline } from "react-icons/io5";

function Navbar() {
  const {user, setUser} = useUser();
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/login');
  }
  const handleRegister = () => {
    navigate('/register');
  }

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    location.reload();
  }

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      navigate(`/collections?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div id="nav_bar">
      <Link className='Link-tag' to="/"><img src="https://theme.hstatic.net/200000690725/1001078549/14/logo.png?v=363" style={{maxHeight: "50px"}} /></Link>
      <Link className='Link-tag' to="/admin">Admin</Link>
      <div className="nav_bar_group_button">
        <div className="nav_bar_button">
          <div>Áo</div>
            <div className="Options">
              <Link className='Link-tag' to='/collections/ao-khoac'>
                <div className="Option">Áo khoác</div>
              </Link>
              <Link className='Link-tag' to='/collections/ao-so-mi'>
                <div className="Option">Áo sơ mi</div>
              </Link>
              <Link className='Link-tag' to='/collections/ao-thun'>
                <div className="Option">Áo thun</div>
              </Link>
              <Link className='Link-tag' to='/collections/ao-polo'>
                <div className="Option">Áo Polo</div>
              </Link>
            </div>
        </div>
        <div className="nav_bar_button" >
          <div>Quần</div>
            <div className="Options">
              <Link className='Link-tag' to='/collections/quan-short'>
                <div className="Option">Quần Short</div>
              </Link>
              <Link className='Link-tag' to='/collections/quan-jeans'>
                <div className="Option">Quần Jeans</div>
              </Link>
              <Link className='Link-tag' to='/collections/quan-au'>
                <div className="Option">Quần Âu</div>
              </Link>
            </div>
        </div>
        <div className="nav_bar_button">
          <div>Giày</div>
            <div className="Options">
              <Link className='Link-tag' to='/collections/giay-tay'>
                <div className="Option">Giày Tây</div>
              </Link>
              <Link className='Link-tag' to='/collections/giay-the-thao'>
                <div className="Option">Giày thể thao</div>
              </Link>
            </div>
        </div>
        <input type="text" placeholder="Tìm kiếm sản phẩm" onChange={(e) => setSearchTerm(e.target.value)}/>
        <button onClick={handleSearch}><FaSearch /></button>
        {!user ? 
          <>
            <div onClick={handleLogin} className="nav_bar_button" style={{fontSize: "1.3em"}}>Đăng nhập</div>
            <div onClick={handleRegister} className="nav_bar_button" style={{fontSize: "1.3em"}}>Đăng ký</div>
          </>
          : 
          <>
            <Link className='Link-tag' to="/cart"><div className='nav_bar_button'><RiShoppingBag4Line style={{fontSize: "1.3em"}} /></div></Link>
            <div className='nav_bar_button'>
              <div><CgProfile style={{fontSize: "1.3em"}} /></div>
              <div className='Options'>
                <Link className='Link-tag' to="/profile"><div className='Option'>Profile<IoPersonCircleOutline /></div></Link>
                <div onClick={logout} className='Option'>Log out<TbLogout/></div>
              </div>
            </div>
          </> 
        }
      </div>
    </div>
  );
}

export default Navbar;