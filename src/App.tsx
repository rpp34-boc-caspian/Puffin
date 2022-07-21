import React from 'react';
import { Metrics } from './components/Metrics/Metrics';

const todoTemplate = {
  title: 'Clean Up',
  start_date: 'Date',
  end_date: 'Date',
  complete: true,
  username: 'JimmyJoeBob'
}

function App() {
  return (
    <div className="App">
      <h1>Hello World!</h1>
      <h2>Watch Tower Up and Running!!</h2>
      <Metrics todos={todoTemplate}></Metrics>
    </div>
  );
}

export default App;
