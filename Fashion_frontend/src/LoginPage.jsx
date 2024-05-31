import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";
function LoginPage() {

    const {setUser} = useUser(); 

    const navigate = useNavigate();

    const loginto = async (e) => {
        e.preventDefault();
        const username = document.getElementById('username_lgin').value;
        const password = document.getElementById('password_lgin').value;
        const data = {
            username,
            password
        }
        const response = await axios.post('http://localhost:3001/login', data);
        if(response.data.status === "success"){
            setUser(response.data.data);
            navigate('/');
          }
        else alert('Login Failed');
    };

    const register_account = async (e) => {
        e.preventDefault();
        const name = document.getElementById('register_name').value;
        const phone = document.getElementById('register_phone').value;
        const email = document.getElementById('register_email').value;
        const password = document.getElementById('register_password').value;
        const data = {
            name,
            phone,
            email,
            password
        }
        const response = await axios.post('http://localhost:3001/register', data);
        if(response.data.status === "success"){
            alert("Please check your mail to active the account");
          }
        else alert(`Register Failed: ${response.data.message}`);
    };

    useEffect(() => {
        const container = document.getElementById('container');
        const registerBtn = document.getElementById('register');
        const loginBtn = document.getElementById('login');

        registerBtn.addEventListener('click', () => {
            container.classList.add("active");
        });

        loginBtn.addEventListener('click', () => {
            container.classList.remove("active");
        });

        return () => {
            registerBtn.removeEventListener('click', () => {
                container.classList.add("active");
            });

            loginBtn.removeEventListener('click', () => {
                container.classList.remove("active");
            });
        }
    }, []);

    return (
        <div id="body">
            <div className="container" id="container">
                <div className="form-container sign-up">
                    <form className="own-form">
                        <h1>Create Account</h1>
                        <div className="social-icons">
                            <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
                            <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
                            <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
                            <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
                        </div>
                        <span>or use your email for registration</span>
                        <input id='register_name' type="text" placeholder="Name" />
                        <input id='register_phone' type="text" maxLength={10} minLength={10} placeholder="Phone" />
                        <input id='register_email' type="email" placeholder="Email" />
                        <input id='register_password' type="password" minLength={6} placeholder="Password" />
                        <button onClick={register_account}>Sign Up</button>
                    </form>
                </div>
                <div className="form-container sign-in">
                    <form className="own-form" method="post">
                        <h1>Sign In</h1>
                        <div className="social-icons">
                            <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
                            <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
                            <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
                            <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
                        </div>
                        <span>or use your email password</span>
                        <input id='username_lgin' type="email" placeholder="Email" />
                        <input id='password_lgin' type="password" placeholder="Password" />
                        <a href="#">Forget Your Password?</a>
                        <button onClick={loginto} type="submit" id="loginFormBtn">Sign In</button>
                    </form>
                </div>
                <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggle-panel toggle-left">
                            <h1>Welcome Back!</h1>
                            <p>Enter your personal details to use all of site features</p>
                            <button className="hidden" id="login">Sign In</button>
                        </div>
                        <div className="toggle-panel toggle-right">
                            <h1>Hello, Friend!</h1>
                            <p>Register with your personal details to use all of site features</p>
                            <button className="hidden" id="register">Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
