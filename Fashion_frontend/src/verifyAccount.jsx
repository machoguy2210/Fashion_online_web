import { useNavigate } from 'react-router-dom';
import logo from './assets/logo.png'
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { IoMdArrowRoundBack } from "react-icons/io";

function VerifyAccount() {

    const navigate = useNavigate();
    
    const [user, setUser] = useState('');

    const emailref = useRef(null);

    const coderef = useRef(null);

    useEffect(() => {
        emailref.current.style.display = 'flex';
        coderef.current.style.display = 'none';
    },[])

    const searchAccount = (e) => {
        e.preventDefault();
        const email = document.getElementById('verify_email').value;
        const data = {
            email
        };
        console.log(data);
        const response = axios.post('http://localhost:3001/search', data).then((response) => {
            if(response.data.status === "success"){
                setUser(response.data.user);
                emailref.current.style.display = 'none';
                coderef.current.style.display = 'flex';                
            } else {
                alert(`${response.data.message}`);
            }
        });
    };

    const resendCode = () => {
        const data = {
            email: user.email
        };
        axios.post('http://localhost:3001/resend', data).then((response) => {
            if(response.data.status === "success"){
                alert('Verification code was sent to your email');
            }
            else{
                alert(`Failed to send verification code: ${response.data.message}`);
            }
        })
    };

    const verifyAccount = (e) => {
        e.preventDefault();
        console.log('Verifying account');
        const email = document.getElementById('verify_email').value;
        const number = document.getElementById('verify_code').value;
        const data = {
            email,
            number
        };
        axios.post('http://localhost:3001/verify', data).then((response) => {
            if(response.data.status === "success"){
                alert('Account verified successfully');
                navigate('/login');
            }else{
                alert(`Verification failed: ${response.data.message}`);
            }
        });
    }
    return (
        <div id='verify_container'>
            <div className='verify_border' ref={emailref}>
                <img src={logo} alt="logo" />
                <h2>Verify Account</h2>
                <p>Please enter your email to search for your account</p>
                <form onSubmit={searchAccount}>
                    <input type="email" placeholder="Enter your email" id="verify_email" required/>
                    <button type='submit'>Search</button>
                </form>                
            </div>
            <div className='verify_border' ref={coderef}>
                <span style={{margin: '0px', width: '100%'}}>
                    <IoMdArrowRoundBack id='arrow_back' onClick={() => {
                        emailref.current.style.display = 'flex';
                        coderef.current.style.display = 'none';
                    }} />
                </span>
                <img src={logo} alt="logo" />
                <h2>Hello {user.name}</h2>
                <p>Please check your email and enter the verification code</p>
                <form onSubmit={verifyAccount} >
                    <input type="text" placeholder="Enter verification code" id="verify_code" minLength={6} maxLength={6} required/>
                    <span onClick={resendCode}>Resend code</span>
                    <button type='submit'>Verify Account</button>
                </form>
            </div>
        </div>
    )
}

export default VerifyAccount;