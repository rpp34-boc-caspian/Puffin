import React from 'react';
import Nav from './Nav';
import DailyCalendar from './DailyCalendar';
import { getDate } from './utils/helper';
import {UnscheduledTodoList} from '../App';

interface Props {
    unscheduledTodoList?: UnscheduledTodoList[];
    setUnscheduledTodoList: React.Dispatch<React.SetStateAction<UnscheduledTodoList[]>>;
}

const Home = (props: Props) => {
    const {unscheduledTodoList, setUnscheduledTodoList} = props;
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
                unscheduledTodoList={unscheduledTodoList}
                setUnscheduledTodoList={setUnscheduledTodoList}
            />
        </>
    )
}
export default Home;