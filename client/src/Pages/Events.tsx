import { useState, useEffect } from 'react';
import '../Styles/Event.css';
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from 'react-icons/md';
import Navbar from '../Components/Navbar';
import { IoClose } from "react-icons/io5";
import Footer from '../Components/Footer';
import EventCard from '../Components/EventCard';
import { getLocation } from "../Services/GeoLocation";
import axios from 'axios';
const suggestions = [
    'Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore', 'Dharmapuri', 
    'Dindigul', 'Erode', 'Kallakurichi', 'Kanchipuram', 'Kanyakumari', 'Karur', 
    'Krishnagiri', 'Madurai', 'Nagapattinam', 'Namakkal', 'Nilgiris', 'Perambalur', 
    'Pudukkottai', 'Ramanathapuram', 'Ranipet', 'Salem', 'Sivagangai', 'Tenkasi', 
    'Thanjavur', 'Theni', 'Thoothukudi', 'Tiruchirappalli', 'Tirunelveli', 'Tirupattur', 
    'Tiruppur', 'Tiruvallur', 'Tiruvannamalai', 'Tiruvarur', 'Vellore', 'Viluppuram', 
    'Virudhunagar'
];

type SelectedItemsType = {
    types: string[],
    dates: string[],
    locations: string[],
    prices: string[],
    popular: string[],
    ages: string[],
}

type EventType={
    _id:string,
    eventTitle:string,
    eventType:string,
    eventDate:string,
    eventLocation:string,
    eventCost:string,
    eventAge:string,
    eventRatings:string,
    images:string[],
    eventDescription:string,
    host:string,
}
const initialSelectedItems: SelectedItemsType = {
    types: [],
    dates: [],
    locations: [],
    prices: [],
    popular: [],
    ages: [],
};

export default function Events() {
    const [user,setUser]= useState("");
    const [events,setEvents]=useState<EventType[]>([]);
    const [showTypeDropdown, setShowTypeDropdown] = useState(false);
    const [showDateDropdown, setShowDateDropdown] = useState(false);
    const [showLocationDropdown, setShowLocationDropdown] = useState(false);
    const [showPriceDropdown, setShowPriceDropdown] = useState(false);
    const [showPopularDropdown, setShowPopularDropdown] = useState(false);
    const [showAgeDropdown, setShowAgeDropdown] = useState(false);
    const [selectedItems, setSelectedItems] = useState<SelectedItemsType>(initialSelectedItems);
    const [currentLocation, setCurrentLocation] = useState({district:""});
    axios.defaults.withCredentials = true;

    useEffect(()=>{
        const fetchUser=async()=>{
            try{
                const response=await axios.get("http://localhost:4000/api/auth/getUser");
                if(response.status==200){
                    setUser(response.data.username);
                }
                else{
                    console.log('Failed to fetch user data:', response.status);
                }
            }catch(error){
                console.log(error);
            }
        };
        fetchUser();
    },[]);

    useEffect(()=>{
        const fetchEvent=async()=>{
            try{
                const response=await axios.get("http://localhost:4000/api/user/getEvents");
                if(response.status==200){
                    setEvents(response.data.events);
                }
                else{
                    console.log('Failed to fetch user data:', response.status);
                }
            }
            catch(error){
                console.log(error);
            }
        }
        fetchEvent();
    },[])

    useEffect(()=>{
        const fetchLocation=async()=>{
            const loc=await getLocation();
            if(loc){
                setCurrentLocation({district:loc.district});
            }
        };
        fetchLocation();
    },[]);

    const handleCheckboxChange = (category: keyof SelectedItemsType, value: string) => {
        setSelectedItems(prevSelectedItems => {
            const updatedCategoryItems = prevSelectedItems[category].includes(value)
                ? prevSelectedItems[category].filter(item => item !== value)
                : [...prevSelectedItems[category], value];
            
            return {
                ...prevSelectedItems,
                [category]: updatedCategoryItems,
            };
        });
    };

    const handleRemoveItem = (category: keyof SelectedItemsType, value: string) => {
        setSelectedItems(prevSelectedItems => {
            const updatedCategoryItems = prevSelectedItems[category].filter(item => item !== value);
            return {
                ...prevSelectedItems,
                [category]: updatedCategoryItems,
            };
        });
    };

    const isChecked = (category: keyof SelectedItemsType, value: string) => {
        return selectedItems[category].includes(value);
    };

    const renderSelectedItems = () => {
        return Object.keys(selectedItems).map(category => (
            selectedItems[category as keyof SelectedItemsType].map(item => (
                <div key={item} className='selected-item-container'>
                    <div className="selected-item">
                        {item}
                    </div>
                    <IoClose size={18} onClick={() => handleRemoveItem(category as keyof SelectedItemsType, item)} />
                </div>
            ))
        ));
    };
    
    const filterEvents=()=>{
        return events.filter(event =>{
            if(selectedItems.types.length>0 && !selectedItems.types.includes(event.eventType)){
                return false;
            }
            if (selectedItems.locations.length>0){
                if(selectedItems.locations.includes('Same As Your Location') && currentLocation){
                    if(event.eventLocation!==currentLocation.district){
                        return false;
                    }
                } 
                else if(!selectedItems.locations.includes(event.eventLocation)){
                    return false;
                }
            }
            if (selectedItems.ages.length > 0 && !selectedItems.ages.includes(event.eventAge)) {
                return false;
            }
            if(selectedItems.ages.length>0 && !selectedItems.ages.includes(event.eventAge)){
                return false;
            }
            if(selectedItems.dates.length>0){
                const today=new Date();
                const tomorrow=new Date(today);
                tomorrow.setDate(today.getDate()+1);
                const nextWeek=new Date(today);
                nextWeek.setDate(today.getDate()+7);
                const eventDate=new Date(event.eventDate);
                const nextWeekEnd=new Date(nextWeek);
                nextWeekEnd.setDate(nextWeek.getDate()+7);
                const dayOfWeek=eventDate.getDay();
                const dateFilterResults=selectedItems.dates.map(dateFilter=>{
                    switch(dateFilter){
                        case "Today":
                            return eventDate.toDateString()===today.toDateString();
                        case "Tomorrow":
                            return eventDate.toDateString()===tomorrow.toDateString();
                        case "This Week":
                            return eventDate>=today && eventDate<=nextWeek;
                        case "This Weekend":``
                            return dayOfWeek===6 ||dayOfWeek===0;
                        case "Next Week":
                            return eventDate>=nextWeek && eventDate<=nextWeekEnd;
                        default:
                            return true;
                    }
                });
                if (!dateFilterResults.some(result=>result)) return false;
            }
            if(selectedItems.prices.length>0){
                const eventCost=event.eventCost;
                const costFilterResults=selectedItems.prices.map(costFilter=>{
                    switch(costFilter){
                        case "Free events":
                            return eventCost==="Free";
                        case "Paid events":
                            return eventCost!=="Free";
                        case "₹0-₹50":
                            return eventCost!=="Free" && parseFloat(eventCost.replace(/[^\d.]/g,''))>=0 && parseFloat(eventCost.replace(/[^\d.]/g,''))<= 50;
                        case "₹50-₹100":
                            return eventCost!=="Free" && parseFloat(eventCost.replace(/[^\d.]/g,''))>50 && parseFloat(eventCost.replace(/[^\d.]/g,''))<=100;
                        case "₹100-₹200":
                            return eventCost!=="Free" && parseFloat(eventCost.replace(/[^\d.]/g,''))>100 && parseFloat(eventCost.replace(/[^\d.]/g,''))<=200;
                        case "More than 200":
                            return eventCost!=="Free" && parseFloat(eventCost.replace(/[^\d.]/g,''))>200;
                        default:
                            return true;
                    }
                });

                if (!costFilterResults.some(result => result)) return false;
            }
            if(selectedItems.popular.length>0){
                const eventRatings=parseInt(event.eventRatings,10)
                const ratingsFilterResults=selectedItems.popular.map(ratingFilter=>{
                    switch(ratingFilter){
                        case "Most Popular":
                            return eventRatings<=4;
                        case "Highly Rated":
                            return eventRatings===5;
                        default:
                            return true;
                    }
                });
                if(!ratingsFilterResults.some(result=>result)) return false;
            }
            return true;
        });
    };

    const renderEvents=()=>{
        const filteredEvents=filterEvents();
        return filteredEvents.map((event)=>{
            return(
                <div key={event._id}>
                    <EventCard event={event} user={{user}}/>
                </div>
            );
        });
    }

    return (
        <>
            <div><Navbar/></div>
            <div className="event-container">
                <div className="event-classify">
                    <div className="event-filter">
                        <p className="event-title">Events</p>
                    </div>
                    <div className="event-filter-opt">
                        <div className="event-type" onClick={() => setShowTypeDropdown(!showTypeDropdown)}>
                            <p className="type">Type</p>
                            {showTypeDropdown ? 
                                <MdOutlineArrowDropUp size={28} className='drop-arrow'/> : 
                                <MdOutlineArrowDropDown size={28} className='drop-arrow'/>
                            }
                        </div>
                        {showTypeDropdown && (
                            <div className="dropdown-content">
                                {['Music', 'Food & Drink', 'Arts & Culture', 'Sports', 'Family & Kids', 'Festivals', 'Workshops', 'Nightlife', 'Others'].map((type) => (
                                    <div key={type}>
                                        <label className='drop-content'>
                                            <p className="name">{type}</p>
                                            <input 
                                                type="checkbox" 
                                                checked={isChecked('types', type)} 
                                                onChange={() => handleCheckboxChange('types', type)} 
                                                title={type} 
                                            />
                                        </label>
                                        <div className="divider"></div>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="event-date" onClick={() => setShowDateDropdown(!showDateDropdown)}>
                            <p className="date">Date</p>
                            {showDateDropdown ?   
                                <MdOutlineArrowDropUp size={28} className='drop-arrow'/> : 
                                <MdOutlineArrowDropDown size={28} className='drop-arrow'/>
                            }
                        </div>
                        {showDateDropdown && (
                            <div className="dropdown-content">
                                {['Today', 'Tomorrow', 'This Week', 'This Weekend', 'Next Week'].map((date) => (
                                    <div key={date}>
                                        <label className='drop-content'>
                                            <p className="name">{date}</p>
                                            <input 
                                                type="checkbox" 
                                                checked={isChecked('dates', date)} 
                                                onChange={() => handleCheckboxChange('dates', date)} 
                                                title={date} 
                                            />
                                        </label>
                                        <div className="divider"></div>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="event-location" onClick={() => setShowLocationDropdown(!showLocationDropdown)}>
                            <p className="locations">Location</p>
                            {showLocationDropdown ?   
                                <MdOutlineArrowDropUp size={28} className='drop-arrow'/> : 
                                <MdOutlineArrowDropDown size={28} className='drop-arrow'/>
                            }
                        </div>
                        {showLocationDropdown && (
                            <div className="dropdown-content">
                                <label className='drop-content'>
                                    <p className="name">Same As Your Location</p>
                                    <input 
                                        type="checkbox" 
                                        checked={isChecked('locations', 'Same As Your Location')} 
                                        onChange={() => handleCheckboxChange('locations', 'Same As Your Location')} 
                                        title='Same As Your Location' 
                                    />
                                </label>
                                <div className="divider"></div>
                                {suggestions.map((location) => (
                                    <div key={location}>
                                        <label className='drop-content'>
                                            <p className="name">{location}</p>
                                            <input 
                                                type="checkbox" 
                                                checked={isChecked('locations', location)} 
                                                onChange={() => handleCheckboxChange('locations', location)} 
                                                title={location} 
                                            />
                                        </label>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="event-price" onClick={() => setShowPriceDropdown(!showPriceDropdown)}>
                            <p className="price">Price</p>
                            {showPriceDropdown ?    
                                <MdOutlineArrowDropUp size={28} className='drop-arrow'/> : 
                                <MdOutlineArrowDropDown size={28} className='drop-arrow'/>
                            }
                        </div>
                        {showPriceDropdown && (
                            <div className="dropdown-content">
                                {['Free events', 'Paid events', '₹0-₹50', '₹50-₹100', '₹100-₹200', 'More than 200'].map((price) => (
                                    <div key={price}>
                                        <label className='drop-content'>
                                            <p className="name">{price}</p>
                                            <input 
                                                type="checkbox" 
                                                checked={isChecked('prices', price)} 
                                                onChange={() => handleCheckboxChange('prices', price)} 
                                                title={price} 
                                            />
                                        </label>
                                        <div className="divider"></div>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="event-popular" onClick={() => setShowPopularDropdown(!showPopularDropdown)}>
                            <p className="popular">Popular</p>
                            {showPopularDropdown ?
                                <MdOutlineArrowDropUp size={28} className='drop-arrow'/> : 
                                <MdOutlineArrowDropDown size={28} className='drop-arrow'/>
                            }
                        </div>
                        {showPopularDropdown && (
                            <div className="dropdown-content">
                                {['Most Popular', 'Highly Rated'].map((popular) => (
                                    <div key={popular}>
                                        <label className='drop-content'>
                                            <p className="name">{popular}</p>
                                            <input 
                                                type="checkbox" 
                                                checked={isChecked('popular', popular)} 
                                                onChange={() => handleCheckboxChange('popular', popular)} 
                                                title={popular} 
                                            />
                                        </label>
                                        <div className="divider"></div>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="event-age" onClick={() => setShowAgeDropdown(!showAgeDropdown)}>
                            <p className="age">Age</p>
                            {showAgeDropdown ?    
                                <MdOutlineArrowDropUp size={28} className='drop-arrow'/> : 
                                <MdOutlineArrowDropDown size={28} className='drop-arrow'/>
                            }
                        </div>
                        {showAgeDropdown && (
                            <div className="dropdown-content">
                                {['All Ages', 'Kids', 'Teens', 'Adults'].map((age) => (
                                    <div key={age}>
                                        <label className='drop-content'>
                                            <p className="name">{age}</p>
                                            <input 
                                                type="checkbox" 
                                                checked={isChecked('ages', age)} 
                                                onChange={() => handleCheckboxChange('ages', age)} 
                                                title={age} 
                                            />
                                        </label>
                                        <div className="divider"></div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="event-filter-result">
                    <div className="filtered-result">
                        {renderSelectedItems()}
                    </div>
                    <div className="filtered-result-section">
                        {renderEvents()}
                    </div>
                </div>
            </div>
            <div><Footer/></div>
        </>
    );
}
