import React from 'react';
import Nav from './Nav';
import DailyCalendar from './DailyCalendar';
import { getDate } from './utils/helper';
import {UnscheduledTodoList, TodoList, FriendsTodoList} from '../App';

interface Props {
    unscheduledTodoList?: UnscheduledTodoList[];
    setUnscheduledTodoList: React.Dispatch<React.SetStateAction<UnscheduledTodoList[]>>;
    myTodos: TodoList[];
    setMyTodos: React.Dispatch<React.SetStateAction<TodoList[]>>;
    friendsTodos: FriendsTodoList[];
}

const Home = (props: Props) => {
    const {unscheduledTodoList, setUnscheduledTodoList, myTodos, setMyTodos, friendsTodos} = props;
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
            <DailyCalendar
                date={date}
                toggleUnscheduledTodo={toggleUnscheduledTodo}
                setToggleUnscheduledTodo={setToggleUnscheduledTodo}
                unscheduledTodoList={unscheduledTodoList}
                setUnscheduledTodoList={setUnscheduledTodoList}
                myTodos={myTodos}
                setMyTodos={setMyTodos}
                friendsTodos={friendsTodos}
            />
        </>
    )
}
export default Home;
