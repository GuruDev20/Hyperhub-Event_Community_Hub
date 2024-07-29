import { useState, useEffect } from 'react';
import { SiHubspot } from "react-icons/si";
import { IoCalendarOutline } from "react-icons/io5";
import { MdOutlineEventAvailable, MdOutlineExplore, MdOutlineLeaderboard, MdOutlinePersonOutline } from "react-icons/md";
import { RiCommunityLine, RiNotificationLine } from "react-icons/ri";
import { Link, useLocation } from 'react-router-dom';
import '../Styles/Navbar.css';
import { getLocation } from "../Services/GeoLocation";

export default function Navbar() {
    const logIn = true;
    const [location, setLocation] = useState({ state: '', country: '' });
    const currentLocation = useLocation();

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
            <Link to='/' className='links'>
                <div className="nav-left">
                    <SiHubspot size={34} className='logo' />
                    <p className='logo-name'>Hyperhub</p>
                </div>
            </Link>
            <div className="nav-middle">
                <Link to='/events' className={`link ${currentLocation.pathname === '/events' ? 'active' : ''}`}>
                    <div className="event">Events<MdOutlineEventAvailable size={24} className='nav-logo' /></div>
                </Link>
                <Link to='/explore' className={`link ${currentLocation.pathname === '/explore' ? 'active' : ''}`}>
                    <div className="explore">Explore<MdOutlineExplore size={24} className='nav-logo' /></div>
                </Link>
                <Link to='/calender' className={`link ${currentLocation.pathname === '/calender' ? 'active' : ''}`}>
                    <div className="my-event">Calendar<IoCalendarOutline size={24} className='nav-logo' /></div>
                </Link>
                <Link to='/leaderboard' className={`link ${currentLocation.pathname === '/leaderboard' ? 'active' : ''}`}>
                    <div className="leaderboard">Leaderboard<MdOutlineLeaderboard size={24} className='nav-logo' /></div>
                </Link>
                <Link to='/community' className={`link ${currentLocation.pathname === '/community' ? 'active' : ''}`}>
                    <div className="community">Community<RiCommunityLine size={24} className='nav-logo' /></div>
                </Link>
                <Link to='/notification' className={`link ${currentLocation.pathname === '/notification' ? 'active' : ''}`}>
                    <div className="notification">Notification<RiNotificationLine size={24} className='nav-logo' /></div>
                </Link>
                {/* <div className="search-bar">
                    <input type="search" className="search-bar" title='Search' placeholder='Search'/>
                </div> */}
            </div>
            <div className="nav-right">
                {
                    !logIn ? (
                        <>
                            <div className="nav-right-login">
                                <Link to='/login'><button className="login">Login</button></Link>
                            </div>
                            <div className="nav-right-register">
                                <Link to='/register'><button className="register">Register</button></Link>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="location">
                                {location.state}, {location.country}
                            </div>
                            <div className="user-profile">
                                <MdOutlinePersonOutline size={30} />
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    )
}
