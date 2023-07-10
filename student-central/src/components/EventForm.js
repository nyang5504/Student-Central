import React from 'react';
import "../styles/EventForm.css"

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const EventForm = (props) => {

    const OrganizeAddEvent = (e) =>{
        e.preventDefault();
        const a_event = new Object();
        a_event.title = e.target.title.value;
        a_event.start = e.target.from.value;
        const end = new Date(e.target.to.value);
        end.setDate(end.getDate() + 2);

        const fixedEnd = String(end.getFullYear()) + "-" + 
            String(end.getMonth()+1).padStart(2,'0') + "-" + 
            String(end.getDate()).padStart(2,"0");

        a_event.end = fixedEnd;
		const new_event = [a_event];
		const all_events = new_event.concat(props.currEvents);
        props.addEvent(all_events);
        clearForm(e);
        props.toggleForm();
    }

    const clearForm = (e) => {
        e.target.title.value = "";
        e.target.from.value = "";
        e.target.to.value = "";
    }

    return (
        <form id="addevent" onSubmit={OrganizeAddEvent}>
            <label htmlFor='title'>Event:</label>
            <input type='text' required id="title"/>

            <label htmlFor='from'>From:</label>
            <input type="date" required id="from"/>

            <label htmlFor='to'>To:</label>
            <input type='date' required id="to"/>

            <input type="submit" id="add"/>
        </form>
        
    );
};

export default EventForm;