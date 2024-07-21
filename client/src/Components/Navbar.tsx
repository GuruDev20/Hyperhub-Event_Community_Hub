import React from 'react'
import { SiHubspot } from "react-icons/si";
import { IoCalendarOutline } from "react-icons/io5";
import { MdOutlineEventAvailable } from "react-icons/md";
import { MdOutlineExplore } from "react-icons/md";
import { MdOutlineLeaderboard } from "react-icons/md";
import { RiCommunityLine } from "react-icons/ri";
import { RiNotificationLine } from "react-icons/ri";
import { MdOutlinePersonOutline } from "react-icons/md";
import '../Styles/Navbar.css'
export default function Navbar() {
    const logIn=false;
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
                        <div className="user-profile">
                            <MdOutlinePersonOutline  size={30}/>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
