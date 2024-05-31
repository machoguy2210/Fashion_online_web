import { useNavigate } from 'react-router-dom';
import logo from './assets/logo.png'
import axios from 'axios';

function VerifyAccount() {
    
    //thêm chỗ gửi lại verificationcode

    const navigate = useNavigate();

    const verifyAccount = (e) => {
        e.preventDefault();
        console.log('Verifying account');
        const email = document.getElementById('verify_email').value;
        const code = document.getElementById('verify_code').value;
        const data = {
            email,
            code
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
            <div id='verify_border'>
                <img src={logo} alt="logo" />
                <h2>Verify Account</h2>
                <p>Please check your mail and enter the verification code</p>
                <form onSubmit={verifyAccount}>
                    <input type="email" placeholder="Enter your email" id="verify_email" required/>
                    <input type="text" placeholder="Enter verification code" id="verify_code" minLength={6} maxLength={6} required/>
                    <button type='submit' >Verify Account</button>
                </form>
            </div>
        </div>
    )
}

export default VerifyAccount;