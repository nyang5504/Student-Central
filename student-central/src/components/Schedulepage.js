import React, { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import '../styles/Schedulepage.css';
import NavBar from './NavBar'
import Footer from './Footer'
import Schedule from './Schedule';
import EventForm from './EventForm';
import AddEventPopup from './AddEventPopup';

const SchedulePage = () => {

    const [events, setEvents] = useState([]);
    const mounted = useRef(false);
    
    const [isFormOpen, setIsFormOpen] = useState(false);

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
                // console.log("SAVETODATABASE", JSON.stringify(events));
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
            console.log(typeof events[0].start);
        }
        else{
            mounted.current = true;
        }
        
    }, [events]);

	// console.log(events);

    const ToggleFormPopup = () => {
        setIsFormOpen(!isFormOpen);
    }

    return (
        <div className="schedulepage-container">
            <NavBar/>
            <Schedule myEvents={events} currEvents={events} updateEvents={setEvents}/>
            <button onClick={ToggleFormPopup}>Add new event</button>
            {isFormOpen && 
                <AddEventPopup 
                    addEvent={setEvents}
                    currEvents={events}
                    toggleForm={ToggleFormPopup}/>
            }
            <Footer/>
        </div>
    );
};

export default SchedulePage;