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
