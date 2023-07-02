import React from 'react';
import { useState } from 'react';
import '../styles/Schedulepage.css';
import NavBar from './NavBar'
import Schedule from './Schedule';
import EventForm from './EventForm';

const SchedulePage = () => {

    const [events, setEvents] = useState([]);

    return (
        <div className="schedulepage-container">
            <Schedule myEvents={events}/>
            <EventForm addEvent={setEvents}/>
        </div>
    );
};

export default SchedulePage;