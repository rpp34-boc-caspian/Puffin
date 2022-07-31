import React from 'react';
import {Tooltip, IconButton } from '@mui/material';
import { Link } from "react-router-dom";
import { MdOutlineMode, MdDeleteOutline } from 'react-icons/md';
import {updateTodo, deleteTodo} from './utils/helper';

const CustomEvent = ({event, setMyTodos}) => {
    const handleTodoEdit = (event) => {

    }

    const handleDeleteEvent = (event) => {
        deleteTodo(event.id)
        .then(({data}) => {
            if (data.message === 'deleted') {
                setMyTodos(pre => pre.filter(todo => todo.id !== event.id))
            }
        })
        .catch(err => console.log(err))
    }
  
    const handleCompleteEvent = (event) => {
        var complete = !event.complete;
        updateTodo(event.id, event.start, event.end, event.allday, complete)
        .then(({data}) => {
            if (data.message === 'updated') {
              setMyTodos(pre => pre.map(todo => todo.id === event.id ? {...todo, complete: !event.complete} : todo));
            }
          })
        .catch(err => console.log('update event err', err))
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
                <input type="checkbox" id="complete" name="complete" onClick={(e) => {handleCompleteEvent(event)}}></input>
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

