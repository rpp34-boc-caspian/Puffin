
import React from 'react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
// import { FormControl } from '@mui/material';


const myCalendarMock = ['Tam','School','Holidays'];

const sharedCalendarMock = ['Darien', 'Vacation', 'Family']


const CustomCalendar = (myTodos) => {
   console.log('myTodos from CustomCalendar', myTodos)

   // input checkbox (create event handler for each)
  return (
    <div className='rbc-toolbar'>
      <div className="myCalendarView" style={{ padding: 5}}>
        <form method="GET" action="/">
          <select name="my-calendar-view" id="my-calendar-view">
            {/* map all available calendars available to that user_id */}
            <option value="/">My Calendar</option>
            <option>
              Tam<input type="checkbox" />
            </option>
            <option value="/tam">Tam</option>
            <option value="/school">School</option>
            <option value="/holidays">Holidays</option>
          </select>
        </form>
      </div>
      <div className="sharedCalendarView" style={{ padding: 5 }}>
        <form method="GET" action="/">
          <select name="shared-calendar-view" id="shared-calendar-view">
            {/* map all available calendars available to that user_id */}
            <option value="/">Shared Calendar</option>
            <option value="/darian">Darian</option>
            <option value="/vacation">Vacation</option>
            <option value="/family">Family</option>
          </select>
        </form>
      </div>
    </div>
  )
}

export default CustomCalendar;


