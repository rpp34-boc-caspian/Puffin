import { Container, Stack } from "@mui/material"
import { useEffect, useState } from "react"
import { Month } from "./components/Month"
import { Today } from "./components/Today"
import { Week } from "./components/Week"
import { Detailed } from "./components/Detailed"

interface userTodo {
  title: string,
  start_date: string,
  end_date: string,
  complete: boolean,
  username?: string,
  category: string
}

interface allTodos {
  todos?: userTodo[],
}

export const Metrics = (props: allTodos) => {
  const todoData = [
      {
        title: 'Study Math',
        start_date: '7/25/22 4:00',
        end_date: '7/25/22 8:22',
        complete: true,
        username: 'Jimmy Bo',
        category: 'School'
      },
      {
        title: 'Feature Update',
        start_date: '7/25/22 4:00',
        end_date: '7/25/22 12:00',
        complete: true,
        username: 'Jimmy Bo',
        category: 'Work'
      },
      {
        title: 'Art',
        start_date: '7/25/22 12:00',
        end_date: '7/25/22 14:00',
        complete: true,
        username: 'Jimmy Bo',
        category: 'School'
      },
      {
        title: 'Interview',
        start_date: '7/25/22 19:00',
        end_date: '7/25/22 20:00',
        complete: true,
        username: 'Jimmy Bo',
        category: 'Work'
      },
      {
        title: 'Study History',
        start_date: '7/22/22 14:00',
        end_date: '7/22/22 16:00',
        complete: true,
        username: 'Jimmy Bo',
        category: 'School'
      }
  ]
  const [data, updateDataMetrics] = useState(todoData);
  const [todayData, updateTodayMetrics] = useState([]);
  const [todayTotalHours, setTodayTotalHours] = useState(0);
  const [todayCategoryTotalHours, setTodayCategoryHours] = useState(0);
  const [weekData, updateWeekMetrics] = useState([]);
  const [weekTotalHours, setWeekTotalHours] = useState(0);
  const [weekCategoryTotalHours, setWeekCategoryHours] = useState(0);
  const [monthData, updateMonthMetrics] = useState([]);
  const [monthTotalHours, setMonthTotalHours] = useState(0);
  const [monthCategoryHours, setMonthCategoryHours] = useState(0);
  const [pageStatus, togglePage] = useState({
    home: true,
    today: false,
    week: false,
    month: false
  })

  const getHours = (todos: any, timeFrame: string) => {
    let hours = 0;
    let todaysDetails: any = {};

    todos.forEach((todo: userTodo) => {
      let beginTime = Date.parse(todo.start_date);
      let endTime = Date.parse(todo.end_date);
      let total = endTime - beginTime;
      total = total / 1000;
      total = total / 60;
      total = total / 60;
      hours += total

      if (todaysDetails[todo.category] === undefined) {
        todaysDetails[todo.category]  = total;
      } else {
        todaysDetails[todo.category] += total;
      }
    });

    if (timeFrame === 'today') {
      if (Number.isInteger(hours)) {
        console.log(hours)
        setTodayTotalHours(hours);
        setTodayCategoryHours(todaysDetails);
        updateTodayMetrics(todos)
      } else {
        setTodayTotalHours(+hours.toFixed(2));
        setTodayCategoryHours(todaysDetails);
        updateTodayMetrics(todos);
      }
    }

    if (timeFrame === 'week') {
      if (Number.isInteger(hours)) {
        console.log(hours)
        setWeekTotalHours(hours);
        setWeekCategoryHours(todaysDetails);
        updateWeekMetrics(todos);
      } else {
        setWeekTotalHours(+hours.toFixed(2));
        setWeekCategoryHours(todaysDetails);
        updateWeekMetrics(todos);
      }
    }

    if (timeFrame === 'month') {
      if (Number.isInteger(hours)) {
        console.log(hours)
        setMonthTotalHours(hours);
        setMonthCategoryHours(todaysDetails);
        updateMonthMetrics(todos);
      } else {
        setMonthTotalHours(+hours.toFixed(2));
        setMonthCategoryHours(todaysDetails);
        updateMonthMetrics(todos);
      }
    }

  }

  useEffect(() => {
    const loadData = (todos: userTodo[]) => {
      let today: userTodo[] = [];
      let thisWeek: userTodo[] = [];
      let thisMonth: userTodo[] = [];

      todos.forEach((todo) => {
        let currentDate = new Date();
        let todoDate = new Date(todo.start_date);
        let todoMonth = todoDate.getMonth();
        let todoYear = todoDate.getFullYear();
        let todoDateString = todoDate.toDateString();
        let todoDateParsed = Date.parse(todo.start_date);
        let todayDateString = new Date().toDateString();
        let currentDateMonth = currentDate.getMonth();
        let currentDateYear = currentDate.getFullYear();

        let firstDayString = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1)).toDateString();
        let lastDayString = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 7)).toDateString();
        let firstDayParsed = Date.parse(firstDayString);
        let lastDayParsed = Date.parse(lastDayString);


        if (todoDateString === todayDateString) {
          today.push(todo);
        }
        if (firstDayParsed <= todoDateParsed || lastDayParsed >= todoDateParsed) {
          thisWeek.push(todo);
        }
        if (todoMonth === currentDateMonth && todoYear === currentDateYear) {
          thisMonth.push(todo);
        }
      });

      if (today.length) {getHours(today, 'today')};
      if (thisWeek.length) {getHours(thisWeek, 'week')};
      if (thisMonth.length) {getHours(thisMonth, 'month')};
    }

    loadData(data);
  }, [data]);

  let page = (
    <Container sx={{p: 2}} maxWidth='sm'>
      <h1>Reports</h1>
      <Stack sx={{mx: 2}} spacing={2}>
        <Today togglePage={togglePage} totalHours={todayTotalHours}></Today>
        <Week togglePage={togglePage} totalHours={weekTotalHours}></Week>
        <Month togglePage={togglePage} totalHours={monthTotalHours}></Month>
      </Stack>
    </Container>
  );

  let todayPage  = (
    <Detailed
      todos={todayData}
      totalHours={todayTotalHours}
      categoryHours={todayCategoryTotalHours}
      togglePage={togglePage}
      timeFrame="Today"
    ></Detailed>
  );
  let weekPage = (
    <Detailed
      todos={weekData}
      totalHours={weekTotalHours}
      categoryHours={weekCategoryTotalHours}
      togglePage={togglePage}
      timeFrame="This Week"
    ></Detailed>
  );
  let monthPage = (
    <Detailed
      todos={monthData}
      totalHours={monthTotalHours}
      categoryHours={monthCategoryHours}
      togglePage={togglePage}
      timeFrame="This Month"
    ></Detailed>
  );

  if (pageStatus.home) {
    page = (
      <Container sx={{p: 2}} maxWidth='sm'>
        <h1>Reports</h1>
        <Stack sx={{mx: 2}} spacing={2}>
          <Today togglePage={togglePage} totalHours={todayTotalHours}></Today>
          <Week togglePage={togglePage} totalHours={weekTotalHours}></Week>
          <Month togglePage={togglePage} totalHours={monthTotalHours}></Month>
        </Stack>
      </Container>
    );
  }
  if(pageStatus.today) {
    page = todayPage;
  }
  if (pageStatus.week) {
    page = weekPage;
  }
  if (pageStatus.month) {
    page = monthPage;
  }

  return (page)
}