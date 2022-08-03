import React, { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';
import { Metrics } from './Metrics/Metrics';
import Home from './home/Home';
import { ToDo } from './ToDo/Todo';
import { Share } from './sharing/share';
import SignUp from './authentication/signup';
import Login from './authentication/login';
import RequireAuth from './authentication/requireAuth';
import axios from 'axios';
import { FakeTodoData } from './Metrics/components/helpers/helpers';
import { ConstructionOutlined } from '@mui/icons-material';
import { UpdateTodo } from './ToDo/Edit-todo';
import { CreateTodo } from './ToDo/Create_todo';

export interface UnscheduledTodoList {
  id?: number,
  title?: string,
  complete?: boolean,
  color?: number
}

export interface TodoList {
  id: number,
  user_id: number,
  cat_id: number,
  title: string,
  descript: string,
  start_d: string,
  end_d: string,
  all_d: boolean,
  complete: boolean,
  color: number
}

const App: React.FC = () => {
  const [metricsPageOpent, toggleMetrics] = useState(false);

  const [shareData, setShareData] = useState<{
    userid: number,
    calendar: string,
    categories: string[],
    todos:string[],
    friends: string[],
    test: any[]
  }[]>([]);

  const [sharingData, setSharingData] = useState<{
    cal_name: string,
    cal_id: number,
    category: string,
    cat_id: number,
    color: number,
    todo_id: number,
    title: string
  }[]>([]);

  const [metricsData, setMetricsData] = useState<{
    title: string,
    start_d: string,
    end_d: string,
    category_name: string,
    color: number,
    todo_id: number
  }[]>([]);
  const [userId, setUserId] = useState(3) //gave default val until signin uses it
  const [unscheduledTodoList, setUnscheduledTodoList] = React.useState<UnscheduledTodoList[]>([]);
  const [myTodos, setMyTodos] = React.useState<TodoList[]>([]);

  useEffect(() => {
    let requestCompletedTodos = axios.get(`http://127.0.0.1:8080/completedTodos/${userId}`);
    let requestUnscheduledTodos = axios.get(`http://127.0.0.1:8080/unscheduledTodos/${userId}`);
    let requestTodos = axios.get(`http://127.0.0.1:8080/todos/${userId}`);
    let requestShares = axios.get(`http://127.0.0.1:8080/share/user_profile/${userId}`)

    axios.all([requestCompletedTodos, requestUnscheduledTodos, requestTodos, requestShares])
      .then(axios.spread((...allData) => {
        console.log('allData in client side', allData);
        setMetricsData(allData[0].data);
        setUnscheduledTodoList(allData[1].data);
        setMyTodos(allData[2].data);
        setSharingData(allData[3].data);
      }))
      .catch((err) => {
        setMetricsData(FakeTodoData)
      })
  },[userId])
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home unscheduledTodoList={unscheduledTodoList} setUnscheduledTodoList={setUnscheduledTodoList} myTodos={myTodos} setMyTodos={setMyTodos}/>} />
            <Route path="/create_todo" element={<CreateTodo />} />
            <Route path="/update_todo/:todoId" element={<UpdateTodo />} />
            <Route path='/share' element={<Share />} />
            <Route path="/metrics/*" element={<Metrics updateMetricsData={setMetricsData} user_id={userId} todos={metricsData}/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
