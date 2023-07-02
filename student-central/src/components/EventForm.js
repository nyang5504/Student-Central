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
        a_event.end = e.target.to.value;
        props.addEvent(a_event);
    }

    return (
        <form id="addevent" onSubmit={OrganizeAddEvent}>
            <label htmlFor='title'>Title:</label>
            <input type='text' required id="title"/>

            <label htmlFor='from'>Form:</label>
            <input type="date" required id="from"/>

            <label htmlFor='to'>To:</label>
            <input type='date' required id="to"/>

            <input type="submit" id="add"/>
        </form>
    );
};

export default EventForm;