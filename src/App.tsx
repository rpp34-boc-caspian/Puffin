import React from 'react';
<<<<<<< HEAD
import { Metrics } from './Metrics/Metrics';

=======
import Nav from './home/Nav';
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';
>>>>>>> master

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <h1>Hello World</h1>
        <Nav />
      </div>
    </ThemeProvider>
  );
}

export default App;