import { useState, useEffect } from 'react';
import '../Styles/Event.css';
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from 'react-icons/md';
import Navbar from '../Components/Navbar';
import { IoClose } from "react-icons/io5";
import Footer from '../Components/Footer';
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

const initialSelectedItems: SelectedItemsType = {
    types: [],
    dates: [],
    locations: [],
    prices: [],
    popular: [],
    ages: [],
};

export default function Events() {
    const [showTypeDropdown, setShowTypeDropdown] = useState(false);
    const [showDateDropdown, setShowDateDropdown] = useState(false);
    const [showLocationDropdown, setShowLocationDropdown] = useState(false);
    const [showPriceDropdown, setShowPriceDropdown] = useState(false);
    const [showPopularDropdown, setShowPopularDropdown] = useState(false);
    const [showAgeDropdown, setShowAgeDropdown] = useState(false);

    const [selectedItems, setSelectedItems] = useState<SelectedItemsType>(initialSelectedItems);

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

    useEffect(() => {
        console.log('Selected Items:', selectedItems);
    }, [selectedItems]);

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
                    <div className="filtered-result-section"></div>
                </div>
            </div>
            <div><Footer/></div>
        </>
    );
}
