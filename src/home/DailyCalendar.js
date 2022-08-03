import React, { useCallback, useMemo, useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { Typography } from '@mui/material';
import UnscheduledTodo from './UnscheduledTodo';
import { styled } from '@mui/material/styles';
import { colorMap } from '../theme';
import CustomEvent from './CustomEvent';
import CustomCalendar from './CustomCalendar';
import { updateTodo } from './utils/helper';


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
  .rbc-event {
    border: 1px solid #fff;
  }
`

let formats = {
  timeGutterFormat: 'ha',
}

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
  const history = useNavigate()
  const [draggedEvent, setDraggedEvent] = useState();
  const [displayDragItemInCell, setDisplayDragItemInCell] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(undefined)

  const handleSelectedEvent = (myTodos) => {
    setSelectedEvent(myTodos)
    history.push(`/edit_todo/${myTodos.id}`);
  }

  const dragFromOutsideItem = useCallback(() => draggedEvent, [draggedEvent])

  const newEvent = useCallback(
    (event) => {
      updateTodo(event.id, event.start, event.end, event.allday)
        .then(({ data }) => {
          console.log('moveEvent', data);
          if (data.message === 'updated') {
            setMyTodos((prev) => {
              return [...prev, event]
            })
          }
        })
        .catch(err => console.log('update event err', err))
    },
    [setMyTodos]
  )

  // need to carry over event.color in order to render colors
  const onDropFromOutside = useCallback(
    ({ start, end, allday: isallday }) => {
      const { id, title, color } = draggedEvent;
      const event = {
        id,
        title,
        start,
        end,
        isallday,
        color
      }
      setDraggedEvent(null)
      newEvent(event)
    },
    [draggedEvent, setDraggedEvent, newEvent]
  )


  const moveEvent = useCallback(
    ({ event, start, end, isallday: droppedOnalldaySlot = false }) => {
      const { allday } = event
      console.log('droppedOnalldaySlot', droppedOnalldaySlot);
      console.log('allday', allday);
      if (!allday && droppedOnalldaySlot) {
        event.allday = true
      }
      updateTodo(event.id, start, end, allday)
        .then(({ data }) => {
          if (data.message === 'updated') {
            setMyTodos((prev) => {
              const existing = prev.find((ev) => ev.id === event.id) ?? {}
              const filtered = prev.filter((ev) => ev.id !== event.id)
              return [...filtered, { ...existing, start, end, allday }]
            })
          }
        })
        .catch(err => console.log('update event err', err))
    },
    [setMyTodos]
  )

  const resizeEvent = useCallback(
    ({ event, start, end }) => {
      updateTodo(event.id, start, end)
        .then(({ data }) => {
          console.log('resizeEvent', data);
          if (data.message === 'updated') {
            setMyTodos((prev) => {
              const existing = prev.find((ev) => ev.id === event.id) ?? {}
              const filtered = prev.filter((ev) => ev.id !== event.id)
              return [...filtered, { ...existing, start, end }]
            })
          }
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
        formats={formats}
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
        // draggable
        eventPropGetter={(event) => {
          let backgroundColor = colorMap[event.color];
          const textDecorationLine = event.complete === false ? 'none' : 'line-through';
          return { style: { backgroundColor, textDecorationLine } }
        }}
        components={{
          event: (props) => <CustomEvent {...props} setMyTodos={setMyTodos} />,
          toolbar: (props) => <CustomCalendar {...props} setMyTodos={setMyTodos} />
        }}
        startAccessor={event => new Date(event.start)}
        endAccessor={event => new Date(event.end)
        }
      />
      <UnscheduledTodo
        toggleUnscheduledTodo={toggleUnscheduledTodo}
        setToggleUnscheduledTodo={setToggleUnscheduledTodo}
        setDraggedEvent={setDraggedEvent}
        unscheduledTodoList={unscheduledTodoList}
        setUnscheduledTodoList={setUnscheduledTodoList}
      />
    </div>
  )
}

