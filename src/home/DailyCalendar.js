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
import { Typography} from '@mui/material';
import UnscheduledTodo from './UnscheduledTodo';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { colorMap } from '../theme';
import CustomEvent from './CustomEvent';




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

// const initialEvents = [
//   {
//     id: 0,
//     user_id: 1,
//     cat_id: 2,
//     // once data is received, need to be reformatted to display with proper links...
//     // example: title needs to be reformatted from string to add a hyperlink so can open to display to-do details
//     title: 'Petit Event',
//     descript: 'This is a modified event to include a description',
//     allDay: false,
//     start: new Date(2022, 6, 29, 3, 30, 0),
//     end: new Date(2022, 6, 29, 7, 30, 0),
//     complete: false
//   },
//   {
//     id: 1,
//     user_id: 1,
//     cat_id: 1,
//     title: 'All Day Event very long title',
//     allDay: false,
//     start: new Date(2022, 6, 29, 16, 30, 0),
//     end: new Date(2022, 6, 29, 18, 30, 0),
//   },

//   {
//     id: 4,
//     user_id: 1,
//     cat_id: 3,
//     title: 'Some Event',
//     start: new Date(2022, 6, 29, 0, 0, 0),
//     end: new Date(2022, 6, 29, 0, 0, 0),
//   },
//   {
//     id: 5,
//     title: 'Conference',
//     user_id: 1,
//     cat_id: 5,
//     start: new Date(2022, 6, 28),
//     end: new Date(2022, 6, 30),
//     desc: 'Big conference for important people',
//   }
// ]

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


const DragAndDropCalendar = withDragAndDrop(styledCalendar)


export default function DailyCalendar({ date, toggleUnscheduledTodo, unscheduledTodoList, setUnscheduledTodoList, setToggleUnscheduledTodo, myTodos, setMyTodos}) {
  const [draggedEvent, setDraggedEvent] = useState();
  const [displayDragItemInCell, setDisplayDragItemInCell] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(undefined)

  const handleSelectedEvent = (myTodos) => {
    setSelectedEvent(myTodos)
  }

  const dragFromOutsideItem = useCallback(() => draggedEvent, [draggedEvent])

  const newEvent = useCallback(
    (event) => {
      setMyTodos((prev) => {
        return [...prev, event]
      })
    },
    [setMyTodos]
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

      setMyTodos((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {}
        const filtered = prev.filter((ev) => ev.id !== event.id)
        return [...filtered, { ...existing, start, end, allDay }]
      })
    },
    [setMyTodos]
  )

  const resizeEvent = useCallback(
    ({ event, start, end }) => {
      setMyTodos((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {}
        const filtered = prev.filter((ev) => ev.id !== event.id)
        return [...filtered, { ...existing, start, end }]
      })
    },
    [setMyTodos]
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
        events={myTodos}
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
          let backgroundColor = colorMap[event.color]
          // visibility is decided based on whether the to-do item is completed or not
          const visibility = event.complete === true ? 'hidden' : 'visible';
          return { style: { backgroundColor, visibility } }
        }}
        toolbar={false}
        components={{
          event: CustomEvent,
          // toolbar: CustomToolbar
        }}
        startAccessor={event => new Date(event.start_d)}
        endAccessor={event => {
          return new Date(event.end_d)
        }}
      />
      <UnscheduledTodo
        toggleUnscheduledTodo={toggleUnscheduledTodo}
        setToggleUnscheduledTodo={setToggleUnscheduledTodo}
        setDraggedEvent={setDraggedEvent}
        unscheduledTodoList={unscheduledTodoList}
        setUnscheduledTodoList={setUnscheduledTodoList}
      />
      {/* {selectedEvent && <ToDoEditModal />} */}
    </div>
  )
}

