import React from 'react';
import {Tooltip, IconButton, Grid} from '@mui/material';
import { Link } from "react-router-dom";
import { MdOutlineMode, MdDeleteOutline } from 'react-icons/md';
import {updateTodo, deleteTodo} from './utils/helper';
import format from 'date-fns/format';

const CustomEvent = ({event, setMyTodos}) => {
    console.log('event', event);
    const handleTodoEdit = (event) => {
       console.log(event);
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
        <Grid container sx={{ml: 1}} alignItems="center">
            <Grid item xs={6}>
                {`${format(new Date(event.start), 'h:mm')} - ${format(new Date(event.end), 'h:mm')}`}
            </Grid>
            <Grid item xs={6} container direction="row" justifyContent="flex-end" alignItems="center">
                <Grid item>
                    <Link to="/edit_todo">
                        <Tooltip title='Edit Event'>
                            <IconButton sx={{ color: 'white' }} aria-label="edit event" onClick={(e) => {handleTodoEdit(event)}}>
                                <MdOutlineMode size={15} />
                            </IconButton>
                        </Tooltip>
                    </Link>
                </Grid>
                <Grid item>
                    <Tooltip title='Mark as Complete'>
                        <input type="checkbox" id="complete" name="complete" onClick={(e) => {handleCompleteEvent(event)}} style={{border: '1px solid #fff'}}></input>
                    </Tooltip>
                </Grid>
                <Grid>
                    <Link to="/">
                        <Tooltip title='Delete Event'>
                        <IconButton sx={{ color: 'white' }} aria-label="delete item" onClick={(e) => {handleDeleteEvent(event)}}>
                            <MdDeleteOutline size={15} />
                        </IconButton>
                        </Tooltip>
                    </Link>
                </Grid>
            </Grid>
            <Grid item xs={12} sx={{mt: -1}}>
                {event.title}
            </Grid>
        </Grid>
    )
}

export default CustomEvent;

