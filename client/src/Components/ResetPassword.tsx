import React,{useState} from 'react'
import { toast } from 'react-hot-toast'
import axios from 'axios';
import { SiHubspot } from 'react-icons/si';
import '../Styles/ResetPassword.css'
import { useParams } from 'react-router-dom';

interface Validation{
    isValid:boolean,
    message:string
}

export default function ResetPassword() {
    const {id,token}=useParams()
    const [password,setPassword]=useState("");
    const [passwordValidation, setPasswordValidation] = useState<Validation>({ isValid: true, message: '' });
    
    axios.defaults.withCredentials = true;

    const handleSubmit=async(e:React.FormEvent)=>{
        e.preventDefault();
        try{
            const response=await axios.post(`http://localhost:4000/api/auth/reset-password/${id}/${token}`,{password},{withCredentials:true});
            if(response.status===200){
                toast.success(response.data.message);
                setTimeout(()=>{
                    window.close();
                },1000);
            }
        }
        catch(err){
            console.log(err);
        }
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value);
        validatePassword(value);
    };

    const validatePassword = (value:string) => {
        const isValid = value.length >= 6;
        const message = isValid ? 'Correct' : 'Password should be at least 6 characters';
        setPasswordValidation({ isValid, message });
    };

    return (
        <>
            <div className="reset-container">
                <div className="reset-box">
                    <SiHubspot size={34} className="reset-logo" />Hyperhub
                </div>
                <div className="reset-form">
                    <form onSubmit={handleSubmit}>
                        <div className="reset-form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" id="password" className="reset-form-control" placeholder='Enter new password' onChange={handlePasswordChange}/>
                            <span className={`validation-message ${passwordValidation.isValid ? 'valid' : 'invalid'}`}>{passwordValidation.message}</span>
                        </div>
                        <div className="reset-opt">
                            <button className="reset-btn" type="submit">Reset Password</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
