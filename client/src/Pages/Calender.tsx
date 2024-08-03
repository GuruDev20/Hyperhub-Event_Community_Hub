import { SetStateAction, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import '../Styles/EventCalender.css';
import { GoPlus } from "react-icons/go";
import { IoMdClose } from "react-icons/io";
import { IoIosStarOutline, IoIosStar } from "react-icons/io";
import { FiUploadCloud } from "react-icons/fi";
const suggestions = [
    'Location', 'Current Location', 'Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore', 'Dharmapuri', 
    'Dindigul', 'Erode', 'Kallakurichi', 'Kanchipuram', 'Kanyakumari', 'Karur', 
    'Krishnagiri', 'Madurai', 'Nagapattinam', 'Namakkal', 'Nilgiris', 'Perambalur', 
    'Pudukkottai', 'Ramanathapuram', 'Ranipet', 'Salem', 'Sivagangai', 'Tenkasi', 
    'Thanjavur', 'Theni', 'Thoothukudi', 'Tiruchirappalli', 'Tirunelveli', 'Tirupattur', 
    'Tiruppur', 'Tiruvallur', 'Tiruvannamalai', 'Tiruvarur', 'Vellore', 'Viluppuram', 
    'Virudhunagar'
];

export default function Calender() {
    const [date, setDate] = useState<Date | null>(new Date());
    const [showAddEventBox,setShowAddEventBox]=useState(false);
    const [eventPrice, setEventPrice] = useState("Free");
    const [eventTitle, setEventTitle] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [eventType, setEventType] = useState("");
    const [eventLocation, setEventLocation]=useState("");
    const [eventCost,setEventCost]=useState("");
    const [eventDate, setEventDate]=useState("");
    const [eventRatings, setEventRatings] = useState<number>(0);
    const [eventAge,setEventAge]=useState("");
    const [showFileInput, setShowFileInput] = useState(true);
    const [displayedImages, setDisplayedImages] = useState(null);
    const handlePriceChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        const price=e.target.value;
        setEventPrice(price);
        if (price === "Free") {
            setEventCost("Free");
        } else {
            setEventCost("");
        }
    };
    const events = [
        { title: "Event 1", date: new Date() },
        { title: "Event 2", date: new Date(new Date().setDate(new Date().getDate() - 1)) },
        { title: "Event 3", date: new Date(new Date().setDate(new Date().getDate() + 1)) },
    ];

    const categorizeEvents = (selectedDate: string | number | Date | null) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const selectedDay = new Date(selectedDate as Date);
        selectedDay.setHours(0, 0, 0, 0);

        if (selectedDay.getTime() === today.getTime()) {
            return "Today Events";
        } else if (selectedDay.getTime() < today.getTime()) {
            return "Past Events";
        } else {
            return "Future Events";
        }
    };

    const filteredEvents = events.filter(event => {
        const eventDate = new Date(event.date);
        eventDate.setHours(0, 0, 0, 0);
        if (date) {
            const comparisonDate = new Date(date);
            comparisonDate.setHours(0, 0, 0, 0);
            return eventDate.getTime() === comparisonDate.getTime();
        }
        return false;
    });

    const toggleShowAddEventBox=()=>{
        setShowAddEventBox(!showAddEventBox);
    }

    const handleRatingChange = (index: number) => {
        setEventRatings(index + 1);
    };

    const handleImageChange=(e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setDisplayedImages(files);
        setShowFileInput(false);
        console.log(files);
    };

    const deleteSelectedImages=()=>{
        setDisplayedImages(null);
        setShowFileInput(true);
    }
    const handleSubmit=()=>{
        console.log(eventTitle,eventDescription,eventType,eventLocation,eventCost,eventDate,eventRatings,eventAge);
    }
    return (
        <div className='overall-container'>
            <div className='calendar-container'>
                <Navbar />
                <div className="calender-content">
                    <div className="cal-left"></div>
                    <div className="cal-mid">
                        <div className="cal-top">
                            <div className="cal-top-left">
                                <p className="cal-title">Your Calendar</p>
                                <div className="cal-calender">
                                    <Calendar onChange={(value) => setDate(value as Date )} value={date} />
                                </div>
                            </div>
                            <div className="cal-top-right">
                                <div className="event-opt">
                                    <div className="cal-categorize">{categorizeEvents(date as Date)}</div>
                                    <div className="add-event">
                                        <button className="add-evt" onClick={toggleShowAddEventBox}>
                                            <p className="add-text">Add</p>
                                            <GoPlus className='add-event-icon' size={20}/>
                                        </button>
                                        {showAddEventBox && 
                                        <>
                                            <div className="blur-overlay"></div>
                                            <div className='toggle-add-box'>
                                                <div className="toggle-content-box">
                                                    <div className="event-title">
                                                        <p className="evt-title">Add Event</p>
                                                        <IoMdClose size={24} onClick={toggleShowAddEventBox} className='toggle-close'/>
                                                    </div>
                                                    <div className="event-details">
                                                        <div className="event-title-description">
                                                            <p className="evt-tite">Event Title</p>
                                                            <input type="text" className='event-title-input' name="event-title" id="event-title" placeholder='Event Title' value={eventTitle} onChange={(e)=>setEventTitle(e.target.value)}/>
                                                        </div>
                                                        <div className="event-sample-img">
                                                            <div className="event-img-description">
                                                                <p className="evt-img-des">Description</p>
                                                                <input type="text" name="event-img" id="event-img" className='des-img' placeholder='Event Description' value={eventDescription} onChange={(e)=>setEventDescription(e.target.value)}/>
                                                            </div>
                                                            <div className="event-img">
                                                                <div className="img-box">
                                                                    {
                                                                        showFileInput &&
                                                                        <div>
                                                                            <label htmlFor="myfileSingle" className="custom-file-input"><FiUploadCloud className='file-img' /> Add Image</label>
                                                                            <input type="file" id="myfileSingle" name="myfileSingle" onChange={handleImageChange} multiple />
                                                                        </div>
                                                                    }
                                                                    {
                                                                        !displayedImages ? (<></>) : (
                                                                            <div className='selected-images-list'>
                                                                                <img src={URL.createObjectURL(displayedImages[0])} alt="Selected" className='select-img' />
                                                                            </div>
                                                                        )
                                                                    }
                                                                    {
                                                                        displayedImages &&
                                                                            <div className='delete-button-container' onClick={deleteSelectedImages}>
                                                                                <button className='delete-button'>Delete</button>
                                                                            </div>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="event-types-dates">
                                                            <div className="event-types">
                                                                <p className="event-type-name">Type</p>
                                                                <select name="event-types" className='event-typ' id="event-type" value={eventType} onChange={(e)=>setEventType(e.target.value)}>
                                                                    <option value="Type">Type</option>
                                                                    <option value="Music" className="list-type-events">Music</option>
                                                                    <option value="Food & Drink" className="list-type-events">Food & Drink</option>
                                                                    <option value="Arts & Culture" className="list-type-events">Arts & Culture</option>
                                                                    <option value="Sports" className="list-type-events">Sports</option>
                                                                    <option value="Family & Kids" className="list-type-events">Family & Kids</option>
                                                                    <option value="Festivals" className="list-type-events">Festivals</option>
                                                                    <option value="Workshops" className="list-type-events">Workshops</option>
                                                                    <option value="Nightlife" className="list-type-events">Nightlife</option>
                                                                    <option value="Others" className="list-type-events">Others</option>
                                                                </select>
                                                            </div>
                                                            <div className="event-dates">
                                                                <p className="event-date-name">Date</p>
                                                                <input type="date" name="date" id="date" className="list-event-dates" value={eventDate} onChange={(e)=>setEventDate(e.target.value)}/>
                                                            </div>
                                                        </div>
                                                        <div className="event-locations-prices">
                                                            <div className="event-locations">
                                                                <p className="event-location-name">Location</p>
                                                                <select name="event-locations" id="event-location" className="location-event" value={eventLocation} onChange={(e)=>setEventLocation(e.target.value)}>
                                                                    {suggestions.map((suggestion, index) => (
                                                                        <option key={index} value={suggestion} className="list-event-location">{suggestion}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <div className="event-popularity">
                                                                <p className="event-ratings-name">Ratings</p>
                                                                <p className="event-ratings">
                                                                    {[...Array(5)].map((_, index) => (
                                                                        <span key={index} className="star" onClick={() => handleRatingChange(index)}>
                                                                            {index < eventRatings ? <IoIosStar size={24} color="#ee964b"/> : <IoIosStarOutline size={24} />}
                                                                        </span>
                                                                    ))}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="event-popularity-ages">
                                                            <div className="event-prices">
                                                                <div className="event-price-details">
                                                                    <p className="event-price-name">Price</p>
                                                                    <select name="event-price" id="event-price" className="event-paid" onChange={handlePriceChange} value={eventCost}>
                                                                        <option value="Price">Price</option>
                                                                        <option value="Free" className="list-event-price">Free</option>
                                                                        <option value="Paid" className="list-event-price">Paid</option>
                                                                    </select>
                                                                </div>
                                                                <>
                                                                    {eventPrice === "Paid" && (
                                                                        <input type="text" name="event-amount" id="event-amount" className="event-amount" placeholder="Enter amount" value={eventCost} onChange={(e)=>setEventCost(e.target.value)} />
                                                                    )}
                                                                </>
                                                            </div>
                                                            <div className="event-ages">
                                                                <p className="event-age-name">Age</p>
                                                                <select name="event-age" id="event-age" className="event-age-category" value={eventAge} onChange={(e)=>setEventAge(e.target.value)}>
                                                                    <option value="All" className="list-event-age">All</option>
                                                                    <option value="Kids" className="list-event-age">Kids</option>
                                                                    <option value="Teens" className="list-event-age">Teens</option>
                                                                    <option value="Adults" className="list-event-age">Adults</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="add-event-btn">
                                                    <button className="add-evt-btn" onClick={handleSubmit}>Add Event</button>
                                                </div>
                                            </div>
                                        </>
                                        }
                                    </div>
                                </div>
                                <div className="cal-filter-event-list">
                                    <div className="cal-scrollable">
                                        {filteredEvents.map((event, index) => (
                                            <div key={index} className='cal-event'>{event.title}
                                                {index < filteredEvents.length - 1 && <div className="divider-cal"></div>}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="cal-bottom">
                            <div className="cal-list-events">
                                <p className="list-of-events">Events</p>
                                <div className="list-scrollable">
                                    {filteredEvents.map((event, index) => (
                                        <div key={index} className='list-event'>{event.title}
                                            {index < filteredEvents.length - 1 && <div className="list-divider-cal"></div>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="cal-right"></div>
                </div>
                <Footer />
            </div>
        </div>
    );
}
