import { useState } from "react";
import '../Styles/Register.css';
import { Link, useNavigate } from 'react-router-dom';
import { SiHubspot } from 'react-icons/si';
import { toast } from 'react-hot-toast';
import axios from "axios";

export default function Register() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mobile, setMobile] = useState('');
    const [nameValidation, setNameValidation] = useState({ isValid: true, message: '' });
    const [emailValidation, setEmailValidation] = useState({ isValid: true, message: '' });
    const [passwordValidation, setPasswordValidation] = useState({ isValid: true, message: '' });
    const [mobileValidation, setMobileValidation] = useState({ isValid: true, message: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(username,email,password,mobile);
        try {
            const response = await axios.post('http://localhost:4000/api/auth/register', { username, email, password, mobile });
            if (response.status === 200) {
                toast.success(response.data.message);
                navigate('/login');
                setUsername('');
                setEmail('');
                setPassword('');
                setMobile('');
                setNameValidation({ isValid: true, message: '' });
                setEmailValidation({ isValid: true, message: '' });
                setPasswordValidation({ isValid: true, message: '' });
                setMobileValidation({ isValid: true, message: '' });
            }
        } catch (err) {
            console.log(err);
            toast.error('Registration failed');
        }
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        switch (id) {
            case 'name':
                setUsername(value);
                validateName(value);
                break;
            case 'email':
                setEmail(value);
                validateEmail(value);
                break;
            case 'password':
                setPassword(value);
                validatePassword(value);
                break;
            case 'mobile':
                setMobile(value);
                validateMobile(value);
                break;
            default:
                break;
        }
    };

    const validateEmail = (value) => {
        const isValid = /^[^\s@]+@[^\s@]+\.(com|in|ac\.in)$/.test(value);
        setEmailValidation({ isValid, message: isValid ? 'Correct' : 'Invalid email address' });
    };

    const validatePassword = (value) => {
        const isValid = value.length >= 6;
        setPasswordValidation({ isValid, message: isValid ? 'Correct' : 'Password should be at least 6 characters' });
    };

    const validateName = (value) => {
        const isValid = /^[a-zA-Z]+$/.test(value);
        setNameValidation({ isValid, message: isValid ? 'Correct' : 'Name should contain only letters' });
    };

    const validateMobile = (value) => {
        const isValid = /^\d{10}$/.test(value);
        setMobileValidation({ isValid, message: isValid ? 'Correct' : 'Invalid mobile number' });
    };

    return (
        <>
            <div className="register-container">
                <div className="register-box"><SiHubspot size={34} className="register-logo" />Hyperhub</div>
                <div className="register-form">
                    <form onSubmit={handleSubmit}>
                        <div className="reg-group">
                            <div className="register-form-group">
                                <label htmlFor="name">Username</label>
                                <input type="text" value={username} onChange={handleChange} id="name" className="register-form-control" placeholder="Username" />
                                <span className={`validation-message ${nameValidation.isValid ? 'valid' : 'invalid'}`}>{nameValidation.message}</span>
                            </div>
                            <div className="register-form-group">
                                <label htmlFor="mobile">Mobile</label>
                                <input type="text" value={mobile} onChange={handleChange} id="mobile" className="register-form-control" placeholder="Mobile" />
                                <span className={`validation-message ${mobileValidation.isValid ? 'valid' : 'invalid'}`}>{mobileValidation.message}</span>
                            </div>
                        </div>
                        <div className="reg-group">
                            <div className="register-form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" value={email} onChange={handleChange} id="email" className="register-form-control" placeholder="Email" />
                                <span className={`validation-message ${emailValidation.isValid ? 'valid' : 'invalid'}`}>{emailValidation.message}</span>
                            </div>
                            <div className="register-form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" value={password} onChange={handleChange} id="password" className="register-form-control" placeholder="Password" />
                                <span className={`validation-message ${passwordValidation.isValid ? 'valid' : 'invalid'}`}>{passwordValidation.message}</span>
                            </div>
                        </div>
                        <button type="submit" className="register-btn">Register</button>
                        <div className="already-account">Already have an account? <Link to="/login" className="link-login"><span className="login-toggle">Login</span></Link></div>
                    </form>
                </div>
            </div>
        </>
    );
}
