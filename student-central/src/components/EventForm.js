import React from 'react';
import "../styles/EventForm.css"

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const EventForm = () => {
    return (
        <form id="addevent">
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