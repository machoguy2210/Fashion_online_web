import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useUser } from '../UserContext';

function Navbar() {
  const {user} = useUser();

  useEffect(() => {
    if (user !== null) {
      const account = document.getElementById('login_signup');
      account.innerHTML = `${user.name}`;
    }
  }, [user]);

  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/login');
  }
  const handleRegister = () => {
    navigate('/register');
  }
  return (
    <>
        <div id="nav_bar">
            <Link style={{textDecoration: 'none'}} to=""><img src="https://theme.hstatic.net/200000690725/1001078549/14/logo.png?v=363" style={{maxHeight: "50px"}} /></Link>
            <Link style={{textDecoration: 'none'}} to="/test">Test</Link> {/* This is a test link to test.jsx */}
            <div className="nav_bar_group_button">
              <div className="nav_bar_button">
                <span>Áo</span>
                  <div className="Options">
                    <Link style={{textDecoration: 'none'}} to='/collections/ao-khoac'>
                      <p className="Option">Áo khoác</p>
                    </Link>
                    <Link style={{textDecoration: 'none'}} to='/collections/ao-so-mi'>
                      <p className="Option">Áo sơ mi</p>
                    </Link>
                    <Link style={{textDecoration: 'none'}} to='/collections/ao-thun'>
                      <p className="Option">Áo thun</p>
                    </Link>
                    <Link style={{textDecoration: 'none'}} to='/collections/ao-polo'>
                      <p className="Option">Áo Polo</p>
                    </Link>
                  </div>
              </div>
              <div className="nav_bar_button" >
                <span>Quần</span>
                  <div className="Options">
                    <Link style={{textDecoration: 'none'}} to='/collections/quan-short'>
                      <p className="Option">Quần Short</p>
                    </Link>
                    <Link style={{textDecoration: 'none'}} to='/collections/quan-jeans'>
                      <p className="Option">Quần Jeans</p>
                    </Link>
                    <Link style={{textDecoration: 'none'}} to='/collections/quan-au'>
                      <p className="Option">Quần Âu</p>
                    </Link>
                  </div>
              </div>
              <div className="nav_bar_button">
                <span>Giày</span>
                  <div className="Options">
                    <Link style={{textDecoration: 'none'}} to='/collections/giay-tay'>
                      <p className="Option">Giày Tây</p>
                    </Link>
                    <Link style={{textDecoration: 'none'}} to='/collections/giay-the-thao'>
                      <p className="Option">Giày thể thao</p>
                    </Link>
                  </div>
              </div>
            </div>
            <input type="text" placeholder="Tìm kiếm sản phẩm" />
            <div id='login_signup' className="nav_bar_group_button">
              <div onClick={handleLogin} className="nav_bar_button" style={{fontSize: "1.3em"}}>Đăng nhập</div>
              <div onClick={handleRegister} className="nav_bar_button" style={{fontSize: "1.3em"}}>Đăng ký</div>
            </div>
            
        </div>
    </>
  );
}

export default Navbar;