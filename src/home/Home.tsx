import React from 'react';
import Nav from './Nav';
import DailyCalendar from './DailyCalendar';
import { getDate } from './utils/helper';

const Home = () => {
    const now = getDate(new Date());
    const [date, setDate] = React.useState<string>(now);
    const [toggleUnscheduledTodo, setToggleUnscheduledTodo] = React.useState(false);
    return (
        <>
            <Nav
                date={date}
                setDate={setDate}
                setToggleUnscheduledTodo={setToggleUnscheduledTodo}
            />
            <DailyCalendar date={date} 
                toggleUnscheduledTodo={toggleUnscheduledTodo} 
                setToggleUnscheduledTodo={setToggleUnscheduledTodo}
            />
        </>
    )
}
export default Home;