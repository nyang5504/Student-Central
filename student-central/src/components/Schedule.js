import React from 'react';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import "../styles/Schedule.css"

const Schedule = (props) => {
    return (
        <FullCalendar
            plugins={[dayGridPlugin]}
            initialView='dayGridMonth'
            events={
                props.myEvents
            }
        />
    );
};

export default Schedule;