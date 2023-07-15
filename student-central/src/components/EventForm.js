import React from 'react';
import "../styles/EventForm.css"

const EventForm = (props) => {

    //create object from form and add to list of events
    const OrganizeAddEvent = (e) =>{
        e.preventDefault();
        
        //create event out of form values
        const a_event = createEventObject(e);

        //add new event to list of all current events
		const new_event = [a_event];
		const all_events = new_event.concat(props.currEvents);
        props.setEvents(all_events);

        clearForm(e);
        //close form after adding event
        props.toggleForm();
    }

    const createEventObject = (e) => {
        const a_event = new Object();
        //get form inputs to create event object
        a_event.title = e.target.title.value;
        a_event.start = e.target.from.value;
        const end = new Date(e.target.to.value);
        end.setDate(end.getDate() + 2);

        a_event.end = formatDate(end);
        return a_event;
    }
    
    const formatDate = (date) => {
        const formattedDate = String(date.getFullYear()) + "-" + 
            String(date.getMonth()+1).padStart(2,'0') + "-" + 
            String(date.getDate()).padStart(2,"0");
        return formattedDate;

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