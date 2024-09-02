import { FormEvent,useState,ChangeEvent } from "react"
import '../Styles/Register.css';
import {Link,useNavigate} from 'react-router-dom';
import { SiHubspot } from 'react-icons/si';
import {toast} from 'react-hot-toast'
import axios from 'axios'
import { FaGoogle } from "react-icons/fa";
import { MdFacebook } from "react-icons/md";
import { FaXTwitter } from "react-icons/fa6";
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

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();  
        console.log(data);
        try{
            const response=await axios.post("http://localhost:4000/api/auth/register",data);
            if(response.status===200){
                setData({ username:'',email: '', password: '', mobile: '' });
                setUsernameValidation({ isValid: true, message: '' });
                setEmailValidation({ isValid: true, message: '' });
                setPasswordValidation({ isValid: true, message: '' });
                setMobileValidation({ isValid: true, message: '' });
                toast.success(response.data.message);
                navigate('/login');
            }
        }   
        catch(err){
            console.log(err);
        }
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

    const handleRegister=async(value:string)=>{
        try{
            const response=await axios.get(`http://localhost:4000/api/auth/${value}`);
            if(response.status===200){
                toast.success(response.data.message);
                navigate('/login');
            }
            else{
                toast.error(response.data.message);
            }
        }
        catch(err){
            console.log(err);
        }
    }
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
                        <div className="register-opt">
                            <div className="google"><FaGoogle size={24} color='#ef233c' onClick={()=>handleRegister('google')}/></div>
                            <div className="facebook"><MdFacebook size={34} color='#4267B2' onClick={()=>handleRegister('facebook')}/></div>
                            <div className="twitter"><FaXTwitter size={24} onClick={()=>handleRegister('twitter')}/></div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}