import { FormEvent, useState, ChangeEvent } from 'react';
import '../Styles/Login.css';
import { SiHubspot } from 'react-icons/si';
import { FaGoogle } from "react-icons/fa";
import { MdFacebook } from "react-icons/md";
import { FaXTwitter } from "react-icons/fa6";
import {toast} from 'react-hot-toast'
import {Link,useNavigate} from 'react-router-dom'
interface LoginData {
    email: string;
    password: string;
}

interface Validation{
    isValid:boolean,
    message:string
}
export default function Login() {
    const navigate=useNavigate();
    const [data, setData] = useState<LoginData>({ email: '', password: '' });
    const [emailValidation, setEmailValidation] = useState<Validation>({ isValid: true, message: '' });
    const [passwordValidation, setPasswordValidation] = useState<Validation>({ isValid: true, message: '' });
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();  
        console.log(data);
        setData({ email: '', password: '' });
        setEmailValidation({ isValid: true, message: '' });
        setPasswordValidation({ isValid: true, message: '' });
        toast.success('Login Successful')
        navigate('/')
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const{id,value}=e.target;
        setData(prevData => ({...prevData,[id]: value,}));
        if(id==='email'){
            validateEmail(value);
        }
        else if(id==='password'){
            validatePassword(value);
        }
    };

    const validateEmail = (value:string) => {
        const isValid = /^[^\s@]+@[^\s@]+\.(com|in|ac\.in)$/.test(value);
        const message = isValid ? 'Correct' : 'Invalid email address';
        setEmailValidation({ isValid, message });
    };

    const validatePassword = (value:string) => {
        const isValid = value.length >= 6;
        const message = isValid ? 'Correct' : 'Password should be at least 6 characters';
        setPasswordValidation({ isValid, message });
    };

    return (
        <>
            <div className="login-container">
                <div className="login-box"><SiHubspot size={34} className="login-logo" />Hyperhub</div>
                <div className="login-form">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" value={data.email} onChange={handleChange} id="email" className="form-control" placeholder="Email"/>
                            <span className={`validation-message ${emailValidation.isValid ? 'valid' : 'invalid'}`}>{emailValidation.message}</span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password" placeholder="Enter password" value={data.password} onChange={handleChange}/>
                            <span className={`validation-message ${passwordValidation.isValid ? 'valid' : 'invalid'}`}>{passwordValidation.message}</span>
                        </div>
                        <div className="forget-password">Forget-Password?</div>
                        <button type="submit" className="login-btn">Login</button>
                        <div className="no-account">Don't have an account?<Link to='/register' className='link-register'><span className="register-toggle">Register</span></Link></div>
                        <div className="login-opt">
                            <div className="google"><FaGoogle size={24} color='#ef233c'/></div>
                            <div className="facebook"><MdFacebook size={34} color='#4267B2'/></div>
                            <div className="twitter"><FaXTwitter size={24}/></div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
