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

export const myCalendar = () => {
  // need to get all calendars associated with userId
  return []
}

export const myFriends = () => {
  // need to get all friends associated with userId
  return []
}

export const getFriendsTodos = (todoId, start, end, allday, complete) => {
  return axios.get(`${url}/friendsTodos`)
  .then((data) => console.log(data))
  .catch((err) => console.log(err))
  // {
  //   start,
  //   end,
  //   allday,
  //   complete
  // })
}