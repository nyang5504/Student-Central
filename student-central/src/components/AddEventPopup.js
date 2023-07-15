import React from 'react';
import EventForm from './EventForm';
import "../styles/AddEventPopup.css"

const AddEventPopup = (props) => {
    return (
        <div id="popup-div">
            <div id="form-backdrop" onClick={props.toggleForm}/>
            <div id="form-container">
                <h3 id="form-title">Add Event</h3>
                <EventForm
                    setEvents={props.setEvents}
                    currEvents={props.currEvents}
                    toggleForm={props.toggleForm}
                />
                <button id="close-btn" onClick={props.toggleForm}>close</button>
            </div>
        </div>
    );
};

export default AddEventPopup;