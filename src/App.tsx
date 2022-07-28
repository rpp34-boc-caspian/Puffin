import React, { useState } from 'react';
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


const App: React.FC = () => {
  const [metricsPageOpent, toggleMetrics] = useState(false);
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create_todo" element={<CreateTodo />} />
            <Route path="/metrics/*" element={<Metrics/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
