import React, { useEffect } from 'react';
import { useState } from 'react';
import '../styles/Schedulepage.css';
import NavBar from './NavBar'
import Schedule from './Schedule';
import EventForm from './EventForm';

const SchedulePage = () => {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        const saveToDatabase = async () => {
            try{
                console.log(JSON.stringify(events));
                await fetch('http://localhost:4000/schedule/save-events', {
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(events)
                })
            } catch (error) {
                console.log("error saveToDatabase", error);
            }
        }
        saveToDatabase();
    }, [events]);

	console.log(events);

    return (
        <div className="schedulepage-container">
            <Schedule myEvents={events}/>
            <EventForm 
				addEvent={setEvents}
				currEvents={events}
			/>
        </div>
    );
};

export default SchedulePage;