import { FormEvent,useState,ChangeEvent } from "react"
import '../Styles/Register.css';
import {Link,useNavigate} from 'react-router-dom';
import { SiHubspot } from 'react-icons/si';
interface RegisterData{
    username:string;
    email:string;
    password:string;
    mobile:string;
}

interface Validation{
    isValid:boolean;
    message:string
}
export default function Register() {
    const navigate=useNavigate();
    const [data,setData]=useState<RegisterData>({username:'',email:'',password:'',mobile:''});
    const [usernameValidation,setUsernameValidation]=useState<Validation>({isValid:true,message:''});
    const [emailValidation,setEmailValidation]=useState<Validation>({isValid:true,message:''});
    const [passwordValidation,setPasswordValidation]=useState<Validation>({isValid:true,message:''});
    const [mobileValidation,setMobileValidation]=useState<Validation>({isValid:true,message:''});

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();  
        console.log(data);
        setData({ username:'',email: '', password: '', mobile: '' });
        setUsernameValidation({ isValid: true, message: '' });
        setEmailValidation({ isValid: true, message: '' });
        setPasswordValidation({ isValid: true, message: '' });
        setMobileValidation({ isValid: true, message: '' });
        navigate('/login');
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
        else if(id==='username'){
            validateUsername(value);
        }
        else if(id==='mobile'){
            validateMobile(value)
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

    const validateUsername = (value:string) => {
        const isValid = /^[a-zA-Z]+$/.test(value);
        const message = isValid ? 'Correct' : 'Username should contain only letters';
        setUsernameValidation({ isValid, message });
    };

    const validateMobile = (value:string) => {
        const isValid = /^\d{10}$/.test(value);
        const message = isValid ? 'Correct' : 'Invalid mobile number';
        setMobileValidation({ isValid, message });
    };

    return (
        <>
            <div className="register-container">
                <div className="register-box"><SiHubspot size={34} className="register-logo" />Hyperhub</div>
                <div className="register-form">
                    <form onSubmit={handleSubmit}>
                        <div className="reg-group">
                            <div className="register-form-group">
                                <label htmlFor="username">Username</label>
                                <input type="text" name="username" value={data.username} onChange={handleChange} id="username" className="register-form-control" placeholder="Username" />
                                <span className={`validation-message ${usernameValidation.isValid ? 'valid' : 'invalid'}`}>{usernameValidation.message}</span>
                            </div>
                            <div className="register-form-group">
                                <label htmlFor="mobile">Mobile</label>
                                <input type="text" name="mobile" value={data.mobile} onChange={handleChange} id="mobile" className="register-form-control" placeholder="Mobile"/>
                                <span className={`validation-message ${mobileValidation.isValid ? 'valid' : 'invalid'}`}>{mobileValidation.message}</span>
                            </div>
                        </div>
                        <div className="reg-group">
                            <div className="register-form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" value={data.email} onChange={handleChange} id="email" className="register-form-control" placeholder="Email"/>
                                <span className={`validation-message ${emailValidation.isValid ? 'valid' : 'invalid'}`}>{emailValidation.message}</span>
                            </div>
                            <div className="register-form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" value={data.password} onChange={handleChange} id="password" className="register-form-control" placeholder="Password"/>
                                <span className={`validation-message ${passwordValidation.isValid ? 'valid' : 'invalid'}`}>{passwordValidation.message}</span>
                            </div>
                        </div>
                        <button type="submit" className="register-btn">Register</button>
                        <div className="already-account">Already have an account? <Link to="/login" className="link-login"><span className="login-toggle">Login</span></Link></div>
                    </form>
                </div>
            </div>
        </>
    )
}
