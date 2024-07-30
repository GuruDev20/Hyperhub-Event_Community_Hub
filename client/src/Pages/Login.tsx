import { FormEvent, useState, ChangeEvent } from 'react';
import '../Styles/Login.css';
import { SiHubspot } from 'react-icons/si';
import { FaGoogle } from "react-icons/fa";
import { MdFacebook } from "react-icons/md";
import { FaXTwitter } from "react-icons/fa6";
import {Link} from 'react-router-dom'
interface LoginData {
    email: string;
    password: string;
}

export default function Login() {
    const [data, setData] = useState<LoginData>({ email: '', password: '' });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();  
        console.log(data);
        setData({ email: '', password: '' });
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const{id,value}=e.target;
        setData(prevData => ({...prevData,[id]: value,}));
    };

    return (
        <>
            <div className="login-container">
                <div className="login-box"><SiHubspot size={34} className="login-logo" />Hyperhub</div>
                <div className="login-form">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control"id="email" placeholder="Enter email" value={data.email} onChange={handleChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password" placeholder="Enter password" value={data.password} onChange={handleChange}/>
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
