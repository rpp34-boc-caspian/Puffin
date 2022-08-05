import React, { useCallback, useMemo, useState } from 'react'
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
import { updateTodo } from './utils/helper';
import FilterMenu from './FilterMenu';


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
  .rbc-event-content {
    font-size: 14px;
  }
  .rbc-event-label {
    display: none;
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


export default function DailyCalendar({ date, toggleUnscheduledTodo, unscheduledTodoList, setUnscheduledTodoList, setToggleUnscheduledTodo, myTodos, setMyTodos, friendsTodos}) {
  const history = useNavigate()
  const [draggedEvent, setDraggedEvent] = useState();
  const [displayDragItemInCell, setDisplayDragItemInCell] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(undefined)

  ////////////////////////////////////beginning

  /// All of this logic needs to be moved up to Home or App

  /// This is a shortcut object- will need to be replaced with proper db query, response object
  let friendsUserId = {
    1: 'Tam',
    2: 'Jane',
    3: 'Darian',
    4: 'Xinxin',
    5: 'Keegan',
    6: 'Cornie'
  }

  let form = (toDo) => {
    let newObject = {
      allday: toDo.all_d,
      color: toDo.color,
      complete: toDo.complete,
      descript: toDo.descript,
      end: toDo.end_d,
      id: toDo.todo_id,
      permission: toDo.permission,
      start: toDo.start_d,
      title: toDo.title,
      author: friendsUserId[toDo.user_id],
      category: toDo.category_name,
      username: toDo.username
    }
    return newObject
  }

  let formedFriendsToDo = friendsTodos.map(form);

  let allTodos = [...formedFriendsToDo, ...myTodos];

  let friends = formedFriendsToDo.filter((eachTodo) =>
    eachTodo.author !== eachTodo.username
  )

  const listOfFriends = [...new Set(friends.map((item) => item.author))];
  const listOfCategories = [...new Set(allTodos.map((todo) => todo.category))];

  ///////////////////////////////end



  const handleSelectedEvent = (myTodos) => {
    setSelectedEvent(myTodos)
    // history.push(`/edit_todo/${myTodos.id}`);
  }

  const dragFromOutsideItem = useCallback(() => draggedEvent, [draggedEvent])

  const newEvent = useCallback(
    (event) => {
      console.log('event', event);
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
      const { id, title, color, complete } = draggedEvent;
      const event = {
        id,
        title,
        start,
        end,
        isallday,
        color,
        complete
      }
      setDraggedEvent(null)
      newEvent(event)
    },
    [draggedEvent, setDraggedEvent, newEvent]
  )


  const moveEvent = useCallback(
    ({ event, start, end, isallday: droppedOnalldaySlot = false }) => {
      const { allday } = event
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


  let eventStyleGetter = (event, start, end, isSelected) => {
    let backgroundColor = colorMap[event.color];
    let textDecorationLine = event.complete === false ? 'none' : 'line-through';
    var style = {
        backgroundColor: backgroundColor,
        textDecorationLine: textDecorationLine
    };
    return {
        style: style
    };
  }

  return (
    <div>
      <Typography
        sx={{ my: 2, textAlign: 'center', color: 'primary.main', fontWeight: 900 }}
      >
        {date}
      </Typography>
      <FilterMenu  listOfFriends={listOfFriends} listOfCategories={listOfCategories} />
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
        toolbar={false}
        dragFromOutsideItem={
          displayDragItemInCell ? dragFromOutsideItem : null
        }
        onDropFromOutside={onDropFromOutside}
        onSelectSlot={newEvent}
        onSelectEvent={(e) => handleSelectedEvent(e)}
        // draggable
        eventPropGetter={eventStyleGetter}
        components={{
          event: (props) => <CustomEvent {...props} setMyTodos={setMyTodos} />
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

