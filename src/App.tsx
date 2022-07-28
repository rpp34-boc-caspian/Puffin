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
import { CreateTodo } from './Create to-do/create-todo';
import SignUp from './authentication/signup';
import Login from './authentication/login';
import axios from 'axios';
import { FakeTodoData } from './Metrics/components/helpers/helpers';


const App: React.FC = () => {
  const [metricsPageOpent, toggleMetrics] = useState(false);
  const [metricsData, setMetricsData] = useState<{
    title: string,
    start_d: string,
    end_d: string,
    category_name: string,
    color: number
  }[]>([]);
  const [userId, setUserId] = useState(3) //gave default val until signin uses it

  useEffect(() => {
    axios.get('http://127.0.0.1:8080/completedTodos/3')
      .then((data: any) => {
        setMetricsData(data.data);
      })
      .catch((err) => {
        console.log('Error:', err);
        setMetricsData(FakeTodoData)
      })
  },[userId])

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create_todo" element={<CreateTodo />} />
            <Route path="/metrics/*" element={<Metrics todos={metricsData}/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
