import React, { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import '../styles/Schedulepage.css';
import NavBar from './NavBar'
import Schedule from './Schedule';
import EventForm from './EventForm';

const SchedulePage = () => {

    const [events, setEvents] = useState([]);
    const mounted = useRef(false);

    useEffect(() => {
        const getData = () => {
            try{
                return fetch('http://localhost:4000/schedule/my-events')
                .then(res => res.json())
                .then(data => setEvents(data));
            } catch (error) {
                console.log("error getData", error);
            }
        }
        getData()
    },[])

    useEffect(() => {
        const saveToDatabase = () => {
            try{
                console.log("SAVETODATABASE", JSON.stringify(events));
                    fetch('http://localhost:4000/schedule/save-events', {
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
        if(mounted.current){
            saveToDatabase();
        }
        else{
            mounted.current = true;
        }
        
    }, [events]);

	// console.log(events);

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