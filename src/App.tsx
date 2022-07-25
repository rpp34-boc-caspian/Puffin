import React, { useState } from 'react';
import Nav from './home/Nav';
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';
import { Metrics } from './Metrics/Metrics';
import DailyCalendar from './home/DailyCalendar';
import UnscheduledTodo from './home/UnscheduledTodo';
import {getDate} from './home/utils/helper';


const App: React.FC = () => {
  const now = getDate(new Date());
  const [date, setDate] = React.useState<string>(now);
  const [toggleUnscheduledTodo, setToggleUnscheduledTodo] = React.useState(false);
  const [metricsPageOpent, toggleMetrics] = useState(false);
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Metrics
          closeMetrics={toggleMetrics}
          todos={[
            {
              title: 'Clean Room',
              start_date: '6/25/16 19:10',
              end_date: '7/1/16 19:45',
              complete: true,
              username: 'Paully',
              category: 'School'
            }
          ]}
        />
        <Nav
          date={date}
          setDate={setDate}
          setToggleUnscheduledTodo={setToggleUnscheduledTodo}
          openMetrics={toggleMetrics}
        />
        <DailyCalendar date={date}/>
        <UnscheduledTodo toggleUnscheduledTodo={toggleUnscheduledTodo} setToggleUnscheduledTodo={setToggleUnscheduledTodo}/>

      </div>
    </ThemeProvider>
  );
}

export default App;
