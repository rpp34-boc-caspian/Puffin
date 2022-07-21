import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import "react-big-calendar/lib/css/react-big-calendar.css";



const locales = {
  'en-US': require('date-fns/locale/en-US')
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
})

const events = [
  {
    title: "Big Meeting",
    allDay: true,
    start: new Date(2022,6,18),
    end: new Date(2022,6,18)
  },
  {
    title: "Vacation",
    start: new Date(2022,6,13),
    end: new Date(2022,6,20)
  },
  {
    title: "Conference",
    start: new Date(2022,6,20),
    end: new Date(2022,6,23)
  },
]


function Daily() {
  const [newEvent, setNewEvent] = useState({title: "", start: "", end: ""})
  const [allEvents, setAllEvents] = useState(events)

    // function handleAddEvent() {
    //   setAllEvents([...allEvents, newEvent])
    // }

  return (
    <div className="Daily">
      <h1>Test</h1>
      <Calendar localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" style={{height: 500, margin: "50px"}} />
    </div>
  );
}

export default Daily;
