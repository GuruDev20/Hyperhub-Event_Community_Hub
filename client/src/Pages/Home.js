import React from 'react'
import Navbar from '../Components/Navbar'
export default function Home() {
    return(
        <div className="home-header">
            <div className="header-navbar">
                <Navbar/>
            </div>
            <div className="home-body">
                <div className="home-body-left">
                    <div className="logo"></div>
                </div>
                <div className="home-body-right">
                    <div className="description"></div>
                </div>
            </div>
        </div>
    )
}
