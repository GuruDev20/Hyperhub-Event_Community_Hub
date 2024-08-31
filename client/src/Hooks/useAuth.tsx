import { useState,useEffect } from "react";
import axios from "axios";

const useAuth=()=>{
    const [accessToken,setAccessToken]=useState<string|null>(null);
    const [refreshing,setRefreshing]=useState<boolean>(false);

    const refreshToken=async()=>{
        try{
            const response=await axios.get("http://localhost:4000/api/auth/refresh",{},{withCredentials:true});
            setAccessToken(response.data.accessToken);
        }   
        catch(error){
            console.log(error);
        }
    }

    const fetchData=async(url:string)=>{
        try{
            const response=await axios.get(url,{
                headers:{
                    Authorization:`Bearer ${accessToken}`
                },
                withCredentials:true,
            });
            return response.data
        }
        catch(err){
            if(axios.isAxiosError(err) && err.response?.status===403){
                if(!refreshing){
                    setRefreshing(true);
                    await refreshToken();
                    setRefreshing(false);
                }
                return fetchData(url);
            }
            else{
                throw err;
            }
        }
    }

    useEffect(()=>{
        const storedToken=document.cookie.split("; ").find(row=>row.startsWith("token="))?.split("=")[1];
        setAccessToken(storedToken||null);
    },[])

    return {fetchData,setAccessToken};
}

export default useAuth;