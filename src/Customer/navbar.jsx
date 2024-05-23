import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Navbar() {
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
            <Link to=""><img src="https://theme.hstatic.net/200000690725/1001078549/14/logo.png?v=363" style={{maxHeight: "50px"}} /></Link>
            <Link to="/test">Test</Link> {/* This is a test link to test.jsx */}
            <div id="nav_bar_group_button">
              <div className="nav_bar_button">
                <span>Áo</span>
                  <div className="Options">
                    <p className="Option">Áo khoác</p>
                    <p className="Option">Áo sơ mi</p>
                    <p className="Option">Áo thun</p>
                    <p className="Option">Áo Polo</p>
                  </div>
              </div>
              <div className="nav_bar_button" >
                <span>Quần</span>
                  <div className="Options">
                    <p className="Option">Quần Short</p>
                    <p className="Option">Quần Jeans</p>
                    <p className="Option">Quần Âu</p>
                  </div>
              </div>
              <div className="nav_bar_button">
                <span>Giày</span>
                  <div className="Options">
                    <p className="Option">Giày Tây</p>
                    <p className="Option">Giày thể thao</p>
                  </div>
              </div>
            </div>
            <input type="text" placeholder="Tìm kiếm sản phẩm" />
            <div id="nav_bar_group_button">
              <div onClick={handleLogin} className="nav_bar_button" style={{fontSize: "1.3em"}}>Đăng nhập</div>
              <div onClick={handleRegister} className="nav_bar_button" style={{fontSize: "1.3em"}}>Đăng ký</div>
            </div>
            
        </div>
    </>
  );
}

export default Navbar;