import React from 'react';


import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import "../styles/Schedule.css"

const Schedule = () => {
    return (
        <FullCalendar
            plugins={[dayGridPlugin]}
            initialView='dayGridMonth'
            events={[
                {title: "homework", date: '2023-07-02'},
            ]}
        />
    );
};

export default Schedule;