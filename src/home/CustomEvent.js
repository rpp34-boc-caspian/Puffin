import React from 'react';
import {Tooltip, IconButton } from '@mui/material';
import { Link } from "react-router-dom";
import { MdOutlineMode, MdDeleteOutline } from 'react-icons/md';

const CustomEvent = (event) => {
    console.log('event', event);
    const handleTodoEdit = (event) => {
      // pass along current event to edit
      console.log('open to do edit component for this event', event.title)
    }
  
    const handleDeleteEvent = (event) => {
      // pass along current event to edit
      console.log('delete this event and refresh current events to display current events', event.title)
    }
  
    const handleCompleteEvent = (event) => {
      console.log('mark this event as complete and re-render to display event with text crossed out', <event className="title"></event>)
    }
  
    return (
        <div className='eventTitle'>
            {event.title}
            <Link to="/edit_todo">
                <Tooltip title='Edit Event'>
                <IconButton sx={{ color: 'white' }} aria-label="edit event" onClick={(e) => {handleTodoEdit(event)}}>
                    <MdOutlineMode size={15} />
                </IconButton>
                </Tooltip>
            </Link>
                <Tooltip title='Mark as Complete'>
                <input type="checkbox" id="complete" name="complete" onClick={(e) => {handleCompleteEvent()}}></input>
                </Tooltip>
            <Link to="/">
                <Tooltip title='Delete Event'>
                <IconButton sx={{ color: 'white' }} aria-label="delete item" onClick={(e) => {handleDeleteEvent(event)}}>
                    <MdDeleteOutline size={15} />
                </IconButton>
                </Tooltip>
            </Link>
        </div>
    )
}

export default CustomEvent;

