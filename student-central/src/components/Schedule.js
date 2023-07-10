import React, { useEffect } from 'react';
import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import "../styles/Schedule.css"

const Schedule = (props) => {

    const [toDelete, setToDelete] = useState({});

    const onEventClick = (e) => {
        const eventTitle = e.event.title;
        const eventStart = e.event.start;
        const eventEnd = e.event.end;

        const formattedEventStart = String(eventStart.getFullYear()) + "-" + 
            String(eventStart.getMonth()+1).padStart(2,'0') + "-" + 
            String(eventStart.getDate()).padStart(2,"0");

        const formattedEventEnd = String(eventEnd.getFullYear()) + "-" + 
        String(eventEnd.getMonth()+1).padStart(2,'0') + "-" + 
        String(eventEnd.getDate()).padStart(2,"0");
        
        const eventDel = {title: eventTitle, start: formattedEventStart, end: formattedEventEnd};
        setToDelete(eventDel);
    }

    useEffect(() => {
        deleteEvent();
    }, [toDelete])

    const deleteEvent = () => {
        const my_events = [...props.currEvents];
        for(let i = 0; i < my_events.length; i++){
            const a_title = my_events[i].title;
            const a_start = my_events[i].start;
            const a_end = my_events[i].end;

            if(toDelete.title == a_title){
                if(toDelete.start == a_start){
                    
                    if(toDelete.end == a_end){
                        my_events.splice(i, 1);
                        props.updateEvents(my_events);
                        return;
                    }
                    continue;
                }
                continue;
            }
        }
    }

    const onEventHover = (e) => {
        document.body.style.cursor = "pointer";
        e.event.setProp("backgroundColor", "#fdaaaa");
        e.event.setProp("borderColor", "#f97c7c");

    }
    const onEventUnhover = (e) => {
        document.body.style.cursor = "";
        e.event.setProp("backgroundColor", "#9BC7EC");
        e.event.setProp("borderColor", "");
    }

    return (
        <FullCalendar
            plugins={[dayGridPlugin]}
            initialView='dayGridMonth'
            events={
                props.myEvents
            }
            selectable={true}
            eventBackgroundColor='#9BC7EC'
            eventClick={onEventClick}
            eventMouseEnter={onEventHover}
            eventMouseLeave={onEventUnhover}
        />
    );
};

export default Schedule;