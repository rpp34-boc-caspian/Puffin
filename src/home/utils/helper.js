import axios from 'axios';

export const getDate = (date) => {
    var options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    var n = date.toLocaleDateString('en-US', options);
    return n;
}

//fetch data
const url = 'http://127.0.0.1:8080';
export const updateTodo = (todoId, start, end, allday, complete) => {
  return axios.put(`${url}/todos/${todoId}`, {
    start,
    end,
    allday,
    complete
  })
}

export const deleteTodo = (todoId) => {
  return axios.delete(`${url}/todos/${todoId}`)
}

export const initialEvents = () => {
  return [
    {
    id: 0,
    user_id: 1,
    cat_id: 2,
    // once data is received, need to be reformatted to display with proper links...
    // example: title needs to be reformatted from string to add a hyperlink so can open to display to-do details
    title: 'Petit Event',
    descript: 'This is a modified event to include a description',
    allDay: false,
    start: new Date(2022, 6, 30, 3, 30, 0),
    end: new Date(2022, 6, 30, 7, 30, 0),
    complete: false
  },
  {
    id: 1,
    user_id: 1,
    cat_id: 1,
    title: 'All Day Event very long title',
    allDay: false,
    start: new Date(2022, 6, 30, 16, 30, 0),
    end: new Date(2022, 6, 30, 18, 30, 0),
  },

  {
    id: 4,
    user_id: 1,
    cat_id: 3,
    title: 'Some Event',
    start: new Date(2022, 6, 30, 0, 0, 0),
    end: new Date(2022, 6, 30, 0, 0, 0),
  },
  {
    id: 5,
    user_id: 1,
    cat_id: 5,
    title: 'Conference',
    start: new Date(2022, 6, 30),
    end: new Date(2022, 6, 30),
    desc: 'Big conference for important people',
  }
]
};

export const myCalendar = () => {
  // need to get all calendars associated with userId
  return []
}

export const myFriends = () => {
  // need to get all friends associated with userId
  return []
}