import React,{useState} from 'react'
import { toast } from 'react-hot-toast'
import axios from 'axios';
import { SiHubspot } from 'react-icons/si';
import '../Styles/ForgetPassword.css'
import { useNavigate } from 'react-router-dom';
interface Validation{
    isValid:boolean,
    message:string
}

export default function ForgetPassword(){
    const navigate=useNavigate();
    const [email,setEmail]=useState("");
    const [emailValidation, setEmailValidation] = useState<Validation>({ isValid: true, message: '' });
    
    axios.defaults.withCredentials = true;

    const handleSubmit=async(e:React.FormEvent)=>{
        e.preventDefault();
        try{
            const response=await axios.post("http://localhost:4000/api/auth/forgot-password",{email},{withCredentials:true});
            if(response.status===200){
                toast.success(response.data.message);
                navigate('/login');
            }
        }
        catch(err){
            console.log(err);
        }
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        validateEmail(value);
    };

    const validateEmail = (value:string) => {
        const isValid = /^[^\s@]+@[^\s@]+\.(com|in|ac\.in)$/.test(value);
        const message = isValid ? 'Correct' : 'Invalid email address';
        setEmailValidation({ isValid, message });
    };

    return(
        <>
            <div className="forget-container">
                <div className="forget-box">
                    <SiHubspot size={34} className="forget-logo" />Hyperhub
                </div>
                <div className="forget-form">
                    <form onSubmit={handleSubmit}>
                        <div className="forget-form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" className="forget-form-control" placeholder='Email' value={email} onChange={handleEmailChange} />
                            <span className={`validation-message ${emailValidation.isValid ? 'valid' : 'invalid'}`}>{emailValidation.message}</span>
                        </div>
                        <div className="forget-opt">
                            <button type="submit" className="forget-btn" disabled={!emailValidation.isValid}>Send</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
