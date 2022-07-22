import React from 'react';
import Nav from './home/Nav';
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';

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