import React from 'react';
import moment from 'moment';
import events from './events';
import BigCalendar from "react-big-calendar";
// import "react-big-calendar/lib/css/react-big-calendar.css";


moment.locale("en");
BigCalendar.momentLocalizer(moment);

const allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

function Daily() {
  return (
    <div className="Daily">
      <h1>Hello World!</h1>
      <h2>This is the Daily View of the To-Do List</h2>
      <div style={{ height: 700 }}>
        <button onClick={() => this.setState({ view: "day" })}>Day</button>
        <button onClick={() => this.setState({ view: "month" })}>Month</button>
        <BigCalendar
          style={{ height: 500, width: this.state.width }}
          toolbar={false}
          events={events}
          step={60}
          views={allViews}
          view={this.state.view}
          onView={() => { }}
          date={this.state.date}
          onNavigate={date => this.setState({ date })}
        />
      </div>
    </div>
  );
}

export default Daily;




// class App extends Component {
//   state = {
//     view: "day",
//     date: new Date(2015, 3, 12),
//     width: 500
//   };

//   componentDidMount() {
//     window.addEventListener("resize", () => {
//       /*this.setState({
//         width: window.innerWidth,
//         height: window.innerHeight
//       });*/
//     });
//   }

//   render() {
//     return (
//       <div style={{ height: 700 }}>
//         <button onClick={() => this.setState({ view: "day" })}>Day</button>
//         <button onClick={() => this.setState({ view: "month" })}>Month</button>
//         <BigCalendar
//           style={{ height: 500, width: this.state.width }}
//           toolbar={false}
//           events={events}
//           step={60}
//           views={allViews}
//           view={this.state.view}
//           onView={() => {}}
//           date={this.state.date}
//           onNavigate={date => this.setState({ date })}
//         />
//       </div>
//     );
//   }
// }

