import React from 'react';
import '../styles/Schedulepage.css';
import NavBar from './NavBar'
import Schedule from './Schedule';
import EventForm from './EventForm';

const SchedulePage = () => {
    return (
        <div className="schedulepage-container">
            <Schedule/>
            <EventForm/>
        </div>
    );
};

export default SchedulePage;