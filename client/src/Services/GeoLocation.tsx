import axios from 'axios';
export const getLocation = async () => {
    try {
        const response = await axios.get('https://ipapi.co/json/',{withCredentials:false});
        const {region,city,country_name}=response.data;
        return {district:city||region,country_name,region:region};
    } catch (error) {
        console.error('Error fetching location', error);
        return null;
    }
};