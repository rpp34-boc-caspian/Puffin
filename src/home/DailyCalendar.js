import React, { useCallback, useMemo, useState, useEffect } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { Typography, Tooltip, IconButton } from '@mui/material';
import UnscheduledTodo from './UnscheduledTodo';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { colorMap } from '../theme';
import { MdOutlineMode, MdDeleteOutline } from 'react-icons/md';
import { Link } from "react-router-dom";





const styledCalendar = styled(Calendar)`
  .rbc-current-time-indicator {
    background-color: #3f50b5;
  }
  .rbc-time-content {
    border-bottom: 1px solid #ddd;
    border-top: none;
    gap: 20px;
  }
  .rbc-time-content > * + * > * {
    border-left: none;
  }
  .rbc-time-header {
    gap: 20px;
  }
  .rbc-time-header-content {
    border-left: none;
    border-bottom: 1px solid #f44336;
  }
  .rbc-timeslot-group {
    border-bottom: none;
  }
  .rbc-label {
    font-size: 12px;
    font-weight: 600;
    color: #3f50b5;
  }
  .rbc-time-view {
    border-top: 1px solid #ddd;
    border-left: none;
    border-right: none;
    border-bottom: none;
    width: 90%;
    margin: 0 auto;
  }
  .rbc-today {
    background-color: #fff;
  }
`

const initialEvents = [
  {
    id: 0,
    user_id: 1,
    cat_id: 2,
    // once data is received, need to be reformatted to display with proper links...
    // example: title needs to be reformatted from string to add a hyperlink so can open to display to-do details
    title: 'Petit Event',
    descript: 'This is a modified event to include a description',
    allDay: false,
    start: new Date(2022, 6, 29, 3, 30, 0),
    end: new Date(2022, 6, 29, 7, 30, 0),
    complete: false
  },
  {
    id: 1,
    user_id: 1,
    cat_id: 1,
    title: 'All Day Event very long title',
    allDay: false,
    start: new Date(2022, 6, 29, 16, 30, 0),
    end: new Date(2022, 6, 29, 18, 30, 0),
  },

  {
    id: 4,
    user_id: 1,
    cat_id: 3,
    title: 'Some Event',
    start: new Date(2022, 6, 29, 0, 0, 0),
    end: new Date(2022, 6, 29, 0, 0, 0),
  },
  {
    id: 5,
    title: 'Conference',
    user_id: 1,
    cat_id: 5,
    start: new Date(2022, 6, 29),
    end: new Date(2022, 6, 29),
    desc: 'Big conference for important people',
  }
]

const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})


const EventComponent = (event) => {

  const handleTodoEdit = (event) => {
    // pass along current event to edit
    console.log('open to do edit component for this event', event.title)
  }

  const handleDeleteEvent = (event) => {
    // pass along current event to edit
    console.log('delete this event and refresh current events to display current events', event.title)
  }

  const handleCompleteEvent = (event) => {
    console.log('mark this event as complete and re-render to display event with text crossed out', event.title)
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
      </div>)
}



const CustomToolbar = () => {
  return (
    <div className='rbc-toolbar'>
      <div className="customView">
        <form method="GET" action="/">
          <select name="calendar-view" id="calendar-view">
            <option value="/">My Calendar</option>
            <option value="/tam">Tam</option>
            <option value="/school">School</option>
            <option value="/holidays">Holidays</option>
          </select>
        </form>
      </div>
    </div>
  )
}



const DragAndDropCalendar = withDragAndDrop(styledCalendar)


export default function DailyCalendar({ date, toggleUnscheduledTodo, setToggleUnscheduledTodo }) {
  const [myEvents, setMyEvents] = useState(initialEvents);
  const [draggedEvent, setDraggedEvent] = useState();
  const [displayDragItemInCell, setDisplayDragItemInCell] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(undefined)


  useEffect(() => {
    let params = 3;

    axios.get(`scheduledTodos/${params}`)
      .then((data) => {
        setMyEvents(data.data);
      })
      .catch((err) => {
        console.log('Error:', err);
      })
  }, [])


  const handleSelectedEvent = (myEvents) => {
    setSelectedEvent(myEvents)
  }

  const dragFromOutsideItem = useCallback(() => draggedEvent, [draggedEvent])

  const newEvent = useCallback(
    (event) => {
      setMyEvents((prev) => {
        return [...prev, event]
      })
    },
    [setMyEvents]
  )

  // need to carry over event.color in order to render colors
  const onDropFromOutside = useCallback(
    ({ start, end, allDay: isAllDay }) => {
      const { id, title } = draggedEvent;
      const event = {
        id,
        title,
        start,
        end,
        isAllDay
      }
      setDraggedEvent(null)
      newEvent(event)
    },
    [draggedEvent, setDraggedEvent, newEvent]
  )


  const moveEvent = useCallback(
    ({ event, start, end, isAllDay: droppedOnAllDaySlot = false }) => {
      const { allDay } = event
      if (!allDay && droppedOnAllDaySlot) {
        event.allDay = true
      }

      setMyEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {}
        const filtered = prev.filter((ev) => ev.id !== event.id)
        return [...filtered, { ...existing, start, end, allDay }]
      })
    },
    [setMyEvents]
  )

  const resizeEvent = useCallback(
    ({ event, start, end }) => {
      setMyEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {}
        const filtered = prev.filter((ev) => ev.id !== event.id)
        return [...filtered, { ...existing, start, end }]
      })
    },
    [setMyEvents]
  )

  const defaultDate = useMemo(() => new Date(), [])



  return (
    <div>
      <Typography
        sx={{ my: 2, textAlign: 'center', color: 'primary.main', fontWeight: 900 }}
      >
        {date}
      </Typography>
      <DragAndDropCalendar
        defaultDate={defaultDate}
        date={date}
        onNavigate={() => { }}
        view='day'
        onView={() => { }}
        events={myEvents}
        localizer={localizer}
        onEventDrop={moveEvent}
        onEventResize={resizeEvent}
        popup
        resizable
        step={60}
        dragFromOutsideItem={
          displayDragItemInCell ? dragFromOutsideItem : null
        }
        onDropFromOutside={onDropFromOutside}
        onSelectSlot={newEvent}
        onSelectEvent={(e) => handleSelectedEvent(e)}
        draggable
        eventPropGetter={(event) => {
          // backgroundColor can be set to any color we decide based on the category id of the to-do item
          let color = event.cat_id;
          let backgroundColor = colorMap[color]
          // visibility is decided based on whether the to-do item is completed or not
          const visibility = event.complete === true ? 'hidden' : 'visible';
          return { style: { backgroundColor, visibility } }
        }}
        components={{
          event: EventComponent,
          toolbar: CustomToolbar
        }}
      />
      <UnscheduledTodo
        toggleUnscheduledTodo={toggleUnscheduledTodo}
        setToggleUnscheduledTodo={setToggleUnscheduledTodo}
        setDraggedEvent={setDraggedEvent}
      />
      {/* {selectedEvent && <ToDoEditModal />} */}
    </div>
  )
}

