import React, { useState } from 'react';
import Nav from './home/Nav';
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';
import { Metrics } from './Metrics/Metrics';

const App: React.FC = () => {
  const [metircsPageOpened, toggleMetrics] = useState(false);
  if (metircsPageOpened) {
    return (
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    )
  } else {
    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <h1>Hello World</h1>
          <Nav openMetrics={toggleMetrics}/>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;