import React from 'react';
import EventForm from './EventForm';

const AddEventPopup = (props) => {
    return (
        <div>
            <EventForm
                addEvent={props.addEvent}
				currEvents={props.currEvents}
                toggleForm={props.toggleForm}
            />
            <button onClick={props.toggleForm}>close</button>
        </div>
    );
};

export default AddEventPopup;