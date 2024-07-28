import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import '../Styles/EventCalender.css';

export default function Calender() {
    const [date, setDate] = useState(new Date());
    const events = [
        { title: "Event 1", date: new Date() },
        { title: "Event 2", date: new Date(new Date().setDate(new Date().getDate() - 1)) },
        { title: "Event 3", date: new Date(new Date().setDate(new Date().getDate() + 1)) },
    ];

    const categorizeEvents = (selectedDate: string | number | Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const selectedDay = new Date(selectedDate);
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
        return eventDate.getTime() === new Date(date).getTime();
    });

    return (
        <div className='calender-container'>
            <Navbar />
            <div className="calender-content">
                <div className="cal-left"></div>
                <div className="cal-mid">
                    <div className="cal-top">
                        <div className="cal-top-left">
                            <p className="cal-title">Your Calendar</p>
                            <div className="cal-calender">
                                <Calendar onChange={setDate} value={date} />
                            </div>
                        </div>
                        <div className="cal-top-right">
                            <div className="cal-categorize">{categorizeEvents(date)}</div>
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
                            Events
                        </div>
                    </div>
                </div>
                <div className="cal-right"></div>
            </div>
            <Footer />
        </div>
    );
}
