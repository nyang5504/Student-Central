import React, { useEffect } from 'react';
import { useState } from 'react';
import '../styles/Schedulepage.css';
import NavBar from './NavBar'
import Footer from './Footer'
import Schedule from './Schedule';
import AddEventPopup from './AddEventPopup';
import AddBtn from "../assets/add-btn.png"

const SchedulePage = () => {

    //state variable and function to keep track of all events
    const [events, setEvents] = useState([]);
    
    const [mounted, setMounted] = useState(false);
    
    //boolean to determine if the form popup is open
    const [isFormOpen, setIsFormOpen] = useState(false);

    //fetches previously saved events from database
    useEffect(() => {
        const getData = () => {
            try{
                return fetch('http://localhost:4000/api/schedule/my-events')
                .then(res => res.json())
                .then(data => setEvents(data));
            } catch (error) {
                console.log("error getData", error);
            }
        }
        getData()
    },[])

    //saves data to database
    useEffect(() => {
        const saveToDatabase = () => {
            try{
                // console.log("SAVETODATABASE", JSON.stringify(events));
                    fetch('http://localhost:4000/api/schedule/save-events', {
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
        //if already mounted, save events to database
        if(mounted){
            saveToDatabase();
        }
        //if mounting for the first time, dont save
        else{
            setMounted(true);
        }
    }, [events]);

    const ToggleFormPopup = () => {
        setIsFormOpen(!isFormOpen);
    }

    return (
        <div className="schedulepage-container">
            <NavBar/>
            {/* component that includes that calendar itself */}
            <Schedule myEvents={events} currEvents={events} updateEvents={setEvents}/>
            {/* image of a plus sign to add events */}
            <img src={AddBtn} onClick={ToggleFormPopup} id="add-btn"/>
            {/* AddEventPopup component will only show if isFormOpen variable is true */}
            {isFormOpen && 
                <AddEventPopup 
                    setEvents={setEvents}
                    currEvents={events}
                    toggleForm={ToggleFormPopup}/>
            }
            <Footer/>
        </div>
    );
};

export default SchedulePage;