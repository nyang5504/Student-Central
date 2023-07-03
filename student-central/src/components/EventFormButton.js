import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

import '../styles/Schedulepage.css';

function clickMe() {
	//alert('You clicked me!');
	var dateStr = prompt('Enter a date in YYY-MM-DD format');
	var date = new Date(dateStr + 'T00:00:00'); // will be in local time
/* 
	if (!isNaN(date.valueOf())) { // valid?
	calendar.addEvent({
	  title: 'dynamic event',
	  start: date,
	  allDay: true
	});
	alert('Great. Now, update your database...');
	} else {
	alert('Invalid date.');
	} */
}

const EventFormButton = () => {
    return (
		
		<button onClick={clickMe}>
			Button
		</button>
    );
};

export default EventFormButton;