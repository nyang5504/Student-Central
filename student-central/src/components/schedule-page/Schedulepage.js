import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/schedule-page/Schedulepage.css';
import Schedule from './Schedule';
import AddEventPopup from './AddEventPopup';
import AddBtn from "../../assets/add-btn.png"

const SchedulePage = () => {

    //state variable and function to keep track of all events
    const [events, setEvents] = useState([]);
    
    const [mounted, setMounted] = useState(false);
    
    //boolean to determine if the form popup is open
    const [isFormOpen, setIsFormOpen] = useState(false);

    const navigate = useNavigate();

    //fetches previously saved events from database
    useEffect(() => {
        const fetchData = () => {
          fetch('http://localhost:4000/api/schedule/my-events', {
            method: 'GET',
            credentials: 'include',
          })
          .then(response => {
            if (response.status === 401) {
              navigate('/login');
              return;
            }
            return response.json();
          })
          .then(data => {
            setEvents(data);
          })
          .catch(error => {
            console.error('Error fetching events:', error);
          });
        };
      
        fetchData();
      }, []);

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
                    body: JSON.stringify(events),
                    credentials: 'include'
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
        </div>
    );
};

export default SchedulePage;