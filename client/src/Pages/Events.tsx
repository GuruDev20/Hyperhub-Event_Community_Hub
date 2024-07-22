import { useState } from 'react';
import '../Styles/Event.css'
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from "react-icons/md";
import Navbar from '../Components/Navbar'

const suggestions = [
    'Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore', 'Dharmapuri', 
    'Dindigul', 'Erode', 'Kallakurichi', 'Kanchipuram', 'Kanyakumari', 'Karur', 
    'Krishnagiri', 'Madurai', 'Nagapattinam', 'Namakkal', 'Nilgiris', 'Perambalur', 
    'Pudukkottai', 'Ramanathapuram', 'Ranipet', 'Salem', 'Sivagangai', 'Tenkasi', 
    'Thanjavur', 'Theni', 'Thoothukudi', 'Tiruchirappalli', 'Tirunelveli', 'Tirupattur', 
    'Tiruppur', 'Tiruvallur', 'Tiruvannamalai', 'Tiruvarur', 'Vellore', 'Viluppuram', 
    'Virudhunagar'
];

export default function Events() {
    const [showTypeDropdown, setShowTypeDropdown] = useState(false);
    const [showDateDropdown, setShowDateDropdown] = useState(false);
    const [showLocationDropdown, setShowLocationDropdown] = useState(false);
    const [showPriceDropdown, setShowPriceDropdown] = useState(false);
    const [showPopularDropdown, setShowPopularDropdown] = useState(false);
    const [showAgeDropdown, setShowAgeDropdown] = useState(false);
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
                                <label className='drop-content'>
                                    <p className="name">Music</p>
                                    <input type="checkbox" name="" id="" title='Music'/>
                                </label>
                                <div className="divider"></div>
                                <label className='drop-content'>
                                    <p className="name">Food & Drink</p>
                                    <input type="checkbox" name="" id="" title='Food & Drink'/>
                                </label>
                                <div className="divider"></div>
                                <label className='drop-content'>
                                    <p className="name">Arts & Culture</p>
                                    <input type="checkbox" name="" id="" title='Arts & Culture'/>
                                </label>
                                <div className="divider"></div>
                                <label className='drop-content'>
                                    <p className="name">Sports</p>
                                    <input type="checkbox" name="" id="" title='Sports'/>
                                </label>
                                <div className="divider"></div>
                                <label className='drop-content'>
                                    <p className="name">Family & Kids</p>
                                    <input type="checkbox" name="" id="" title='Family & Kids'/>
                                </label>
                                <div className="divider"></div>
                                <label className='drop-content'>
                                    <p className="name">Festivals</p>
                                    <input type="checkbox" name="" id="" title='Festivals'/>
                                </label>
                                <div className="divider"></div>
                                <label className='drop-content'>
                                    <p className="name">Workshops</p>
                                    <input type="checkbox" name="" id="" title='Workshops'/>
                                </label>
                                <div className="divider"></div>
                                <label className='drop-content'>
                                    <p className="name">Nightlife</p>
                                    <input type="checkbox" name="" id="" title='Nightlife'/>
                                </label>
                                <div className="divider"></div>
                                <label className='drop-content'>
                                    <p className="name">Others</p>
                                    <input type="checkbox" name="" id="" title='Others'/>
                                </label>
                            </div>
                        )}
                        <div className="event-date" onClick={()=>setShowDateDropdown(!showDateDropdown)}>
                            <p className="date">Date</p>
                            {showDateDropdown?   
                                <MdOutlineArrowDropUp size={28} className='drop-arrow'/> : 
                                <MdOutlineArrowDropDown size={28} className='drop-arrow'/>
                            }
                        </div>
                        {showDateDropdown&&(
                            <div className="dropdown-content">
                                <label className='drop-content'>
                                    <p className="name">Today</p>
                                    <input type="checkbox" name="" id="" title='Today'/>
                                </label>
                                <div className="divider"></div>
                                <label className='drop-content'>
                                    <p className="name">Tomorrow</p>
                                    <input type="checkbox" name="" id="" title='Tomorrow'/>
                                </label>
                                <div className="divider"></div>
                                <label className='drop-content'>
                                    <p className="name">This Week</p>
                                    <input type="checkbox" name="" id="" title='This Week'/>
                                </label>
                                <div className="divider"></div>
                                <label className='drop-content'>
                                    <p className="name">This Weekend</p>
                                    <input type="checkbox" name="" id="" title='This Weekend'/>
                                </label>
                                <div className="divider"></div>
                                <label className='drop-content'>
                                    <p className="name">Next Week</p>
                                    <input type="checkbox" name="" id="" title='Next Week'/>
                                </label>
                            </div>
                        )}
                        <div className="event-location" onClick={()=>setShowLocationDropdown(!showLocationDropdown)}>
                            <p className="locations">Location</p>
                            {showLocationDropdown?   
                                <MdOutlineArrowDropUp size={28} className='drop-arrow'/> : 
                                <MdOutlineArrowDropDown size={28} className='drop-arrow'/>
                            }
                        </div>
                        {showLocationDropdown&&(
                            <div className="dropdown-content">
                                <label className='drop-content'>
                                    <p className="name">Same As Your Location</p>
                                    <input type="checkbox" name="" id="" title='Same As Your Location'/>
                                </label>
                                <div className="divider"></div>
                                {suggestions.map((location, index) => (
                                    <div key={index}>
                                        <label className='drop-content'>
                                            <p className="name">{location}</p>
                                            <input type="checkbox" name="" id="" title={location} />
                                        </label>
                                        <div className="divider"></div>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="event-price" onClick={()=>setShowPriceDropdown(!showPriceDropdown)}>
                            <p className="price">Price</p>
                            {showPriceDropdown?    
                                <MdOutlineArrowDropUp size={28} className='drop-arrow'/> : 
                                <MdOutlineArrowDropDown size={28} className='drop-arrow'/>
                            }
                        </div>
                        {showPriceDropdown&&(
                            <div className="dropdown-content">
                                <label className='drop-content'>
                                    <p className="name">Free events</p>
                                    <input type="checkbox" name="" id="" title='Free events'/>
                                </label>
                                <div className="divider"></div>
                                <label className='drop-content'>
                                    <p className="name">Paid events</p>
                                    <input type="checkbox" name="" id="" title='Paid events'/>
                                </label>
                                <div className="divider"></div>
                                <label className='drop-content'>
                                    <p className="name">₹0-₹50</p>
                                    <input type="checkbox" name="" id="" title='Paid events'/>
                                </label>
                                <div className="divider"></div>
                                <label className='drop-content'>
                                    <p className="name">₹50-₹100</p>
                                    <input type="checkbox" name="" id="" title='Paid events'/>
                                </label>
                                <div className="divider"></div>
                                <label className='drop-content'>
                                    <p className="name">₹100-₹200</p>
                                    <input type="checkbox" name="" id="" title='Paid events'/>
                                </label>
                                <div className="divider"></div>
                                <label className='drop-content'>
                                    <p className="name">More than 200</p>
                                    <input type="checkbox" name="" id="" title='Paid events'/>
                                </label>
                            </div>
                        )}
                        <div className="event-popular" onClick={()=>setShowPopularDropdown(!showPopularDropdown)}>
                            <p className="popular">Popular</p>
                            {showPopularDropdown?
                                <MdOutlineArrowDropUp size={28} className='drop-arrow'/> : 
                                <MdOutlineArrowDropDown size={28} className='drop-arrow'/>
                            }
                        </div>
                        {showPopularDropdown&&(
                            <div className="dropdown-content">
                                <label className='drop-content'>
                                    <p className="name">Most Popular</p>
                                    <input type="checkbox" name="" id="" title='Most Popular'/>
                                </label>
                                <div className="divider"></div>
                                <label className='drop-content'>
                                    <p className="name">Highly Rated</p>
                                    <input type="checkbox" name="" id="" title='Highly Rated'/>
                                </label>
                            </div>
                        )}
                        <div className="event-age" onClick={()=>setShowAgeDropdown(!showAgeDropdown)}>
                            <p className="age">Age</p>
                            {showAgeDropdown?    
                                <MdOutlineArrowDropUp size={28} className='drop-arrow'/> : 
                                <MdOutlineArrowDropDown size={28} className='drop-arrow'/>
                            }
                        </div>
                        {showAgeDropdown&&(
                            <div className="dropdown-content">
                                <label className='drop-content'>
                                    <p className="name">All ages</p>
                                    <input type="checkbox" name="" id="" title='All ages'/>
                                </label>
                                <div className="divider"></div>
                                <label className='drop-content'>
                                    <p className="name">Kids</p>
                                    <input type="checkbox" name="" id="" title='Kids'/>
                                </label>
                                <div className="divider"></div>
                                <label className='drop-content'>
                                    <p className="name">Teens</p>
                                    <input type="checkbox" name="" id="" title='Teens'/>
                                </label>
                                <div className="divider"></div>
                                <label className='drop-content'>
                                    <p className="name">Adults</p>
                                    <input type="checkbox" name="" id="" title='Adults'/>
                                </label>
                            </div>
                        )}
                    </div>
                </div>
                <div className="event-filter-result"></div>
            </div>
        </> 
    )
}
