import React, {useCallback, useMemo, useState } from 'react'
import { Calendar, Views, dateFnsLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import enUS from 'date-fns/locale/en-US'
import "react-big-calendar/lib/css/react-big-calendar.css";
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import { Typography } from '@mui/material';

const initialEvents = [
    {
      id: 0,
      title: 'All Day Event very long title',
      allDay: true,
      start: new Date(2022, 6, 22),
      end: new Date(2022, 6, 22),
    },
  
    {
      id: 4,
      title: 'Some Event',
      start: new Date(2022, 6, 22, 0, 0, 0),
      end: new Date(2015, 3, 10, 0, 0, 0),
    },
    {
      id: 5,
      title: 'Conference',
      start: new Date(2022, 6, 22),
      end: new Date(2022, 6, 22),
      desc: 'Big conference for important people',
    },
    {
      id: 6,
      title: 'Meeting',
      start: new Date(2022, 6, 22, 10, 30, 0, 0),
      end: new Date(2022, 6, 22, 12, 30, 0, 0),
      desc: 'Pre-meeting meeting, to prepare for the meeting',
    },
    {
      id: 7,
      title: 'Lunch',
      start: new Date(2022, 6, 22, 12, 0, 0, 0),
      end: new Date(2022, 6, 22, 13, 0, 0, 0),
      desc: 'Power lunch',
    },
    {
      id: 8,
      title: 'Meeting',
      start: new Date(2022, 6, 22, 14, 0, 0, 0),
      end: new Date(2022, 6, 22, 15, 0, 0, 0),
    },
    {
      id: 9,
      title: 'Happy Hour',
      start: new Date(2022, 6, 22, 17, 0, 0, 0),
      end: new Date(2022, 6, 22, 17, 30, 0, 0),
      desc: 'Most important meal of the day',
    },
    {
      id: 10,
      title: 'Dinner',
      start: new Date(2022, 6, 23, 20, 0, 0, 0),
      end: new Date(2022, 6, 23, 21, 0, 0, 0),
    },
    {
      id: 11,
      title: 'Planning Meeting with Paige',
      start: new Date(2022, 6, 23, 8, 0, 0),
      end: new Date(2022, 6, 23, 10, 30, 0),
    },
    
    {
      id: 23,
      title: 'Go to the gym',
      start: new Date(2022, 6, 23, 18, 30, 0),
      end: new Date(2022, 6, 23, 20, 0, 0),
    },
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

const DragAndDropCalendar = withDragAndDrop(Calendar)

export default function DailyCalendar({date}) {
  const [myEvents, setMyEvents] = useState(initialEvents);

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
        <Typography>{date}</Typography>
        <DragAndDropCalendar
            defaultDate={defaultDate}
            date={date}
            view='day' 
            // views={allViews}
            events={myEvents}
            localizer={localizer}
            onEventDrop={moveEvent}
            onEventResize={resizeEvent}
            popup
            resizable
            step={60}
            toolbar={false}
            style={{marginTop: '20px'}}
        />

    </div>
  )
}

