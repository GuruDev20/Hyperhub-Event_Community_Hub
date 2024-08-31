import React from 'react'
import '../Styles/EventCard.css'
import { GoHeartFill } from "react-icons/go"
import { IoIosStar } from "react-icons/io";
import { MdWifiCalling3 } from "react-icons/md";
type EventType={
    event:{
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
        host:string
    },
    user:{
        user:string
    }
}

const EventCard:React.FC<EventType>=({event,user})=>{

    const getImagePath=(image:string)=>{
        try{
            return new URL(`../Assets/${image}`,import.meta.url).toString();
        }
        catch(err){
            console.log(err);
            return '';
        }
    }
    const registerEvent=(user:string)=>{
        console.log(user)
    }

    const addToWishlist=(event:string,user:string)=>{
        console.log(event,user)
    }

    const contactHost=(host:string)=>{
        console.log(host)
    }
    
    const renderStars=(rating:number)=>{
        const totalStars=5;
        const filledStars=Math.floor(rating);
        const stars=[];
        for(let i=0;i<totalStars;i++){
            stars.push(<IoIosStar key={i} color={i<filledStars? '#ee964b':'#adb5bd'} size={20} />);
        }
        return stars;
    };

    return (
        <>
            <div className="event-card">
                <img src={getImagePath(event.images[0])} alt="event-card-img" className="event-card-img" />
                <div className="event-details">
                    <div className="event-det">
                        <div className="event-details-main">
                            <h3 className="event-card-title">{event.eventTitle}</h3>
                            <p className="event-card-description">{event.eventDescription}</p>
                        </div>
                        <div className="event-details-sub">
                            <div className='event-date-location'>
                                <p className="event-card-date">Date: {event.eventDate}</p>
                                <p className="event-card-location">Location: {event.eventLocation}</p>
                            </div>
                            <div className='event-price-age'>
                                <p className="event-card-price">Price: {event.eventCost}</p>
                                <p className="event-card-age">Age: {event.eventAge}</p>
                            </div>
                            <div className='event-ratings-host'>
                                <p className="event-card-ratings">{renderStars(Number(event.eventRatings))}</p>
                                <p className="event-card-host">Host: {event.host}</p>
                            </div>
                        </div>
                    </div>
                    <div className="buttons-card-section">
                        <button className="event-card-register-button" onClick={()=>registerEvent(user.user)}>Register</button>
                        <button className="event-card-wishlist" onClick={()=>addToWishlist(event._id,user.user)}><GoHeartFill size={22} color='palevioletred'/></button>
                        <button className="event-card-contact" onClick={()=>contactHost(event.host)}><MdWifiCalling3 size={22}/></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EventCard;