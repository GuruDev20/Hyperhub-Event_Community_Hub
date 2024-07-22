import React, { useState, useEffect } from 'react';
import { SiHubspot } from "react-icons/si";
import { IoCalendarOutline } from "react-icons/io5";
import { MdOutlineEventAvailable, MdOutlineExplore, MdOutlineLeaderboard, MdOutlinePersonOutline } from "react-icons/md";
import { RiCommunityLine, RiNotificationLine } from "react-icons/ri";
import '../Styles/Navbar.css';
import { getLocation } from "../Services/GeoLocation";
export default function Navbar() {
    
    const logIn=false;
    const [location, setLocation] = useState({ state: '', country: '' });

    useEffect(() => {
        const fetchLocation = async () => {
            const loc = await getLocation();
            if (loc) {
                setLocation({ state: loc.region, country: loc.country_name });
            }
        };
        fetchLocation();
    }, []);

    return (
        <div className="navbar-head">
            <div className="nav-left">
                <SiHubspot size={34} className='logo'/>
                <p className='logo-name'>Hyperhub</p>
            </div>
            <div className="nav-middle">
                <div className="event">Events<MdOutlineEventAvailable size={24} className='nav-logo'/></div>
                <div className="explore">Explore<MdOutlineExplore size={24} className='nav-logo'/></div>
                <div className="my-event">Calender<IoCalendarOutline size={24} className='nav-logo'/></div>
                <div className="leaderboard">Leaderboard<MdOutlineLeaderboard size={24} className='nav-logo'/></div>
                <div className="community">Community<RiCommunityLine size={24} className='nav-logo'/></div>
                <div className="notification">Notification<RiNotificationLine size={24} className='nav-logo'/></div>
                <div className="search-bar">
                    <input type="search" className="search-bar" title='Search' placeholder='Search'/>
                </div>
            </div>
            <div className="nav-right">
                {
                    logIn?(
                        <>
                            <div className="nav-right-login">
                                <button className="login">Login</button>
                            </div>
                            <div className="nav-right-register">
                                <button className="register">Register</button>
                            </div>
                        </>
                    ):(
                        <>
                            <div className="location">
                                {location.state}, {location.country}
                            </div>
                            <div className="user-profile">
                                <MdOutlinePersonOutline  size={30}/>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    )
}
