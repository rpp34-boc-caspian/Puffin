import { Container, Stack } from "@mui/material"
import { useEffect, useState } from "react"
import { Month } from "./components/Month"
import { Today } from "./components/Today"
import { Week } from "./components/Week"
import { TodayDetailed } from "./components/TodayDetailed"

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
        start_date: '7/22/22 4:00',
        end_date: '7/22/22 14:00',
        complete: true,
        username: 'Jimmy Bo',
        category: 'School'
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
  const [todayData, updateTodayMetrics] = useState(todoData);
  const [todayTotalHours, setTotalHours] = useState(0);
  const [details, setDetails] = useState(null);
  // const [weekData, updateWeekMetrics] = useState(todoData);
  // const [monthData, updateMonthMetrics] = useState(todoData);
  const [pageStatus, togglePage] = useState({
    home: true,
    today: false,
    week: false,
    month: false
  })
  let page = (
    <Container sx={{p: 2}} maxWidth='sm'>
      <h1>Reports</h1>
      <Stack sx={{mx: 2}} spacing={2}>
        <Today togglePage={togglePage} totalHours={todayTotalHours}></Today>
        <Week></Week>
        <Month></Month>
      </Stack>
    </Container>
  );

  const getTodayData = (todos: userTodo[]) => {
    let hours = 0;
    let todaysDetails: any = {};
    if (todos) {
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

      if (Number.isInteger(hours)) {
        setTotalHours(hours);
        setDetails(todaysDetails);
      } else {
        setTotalHours(+hours.toFixed(2));
        setDetails(todaysDetails);
      }
      setDetails(todaysDetails);
    }
  }

  useEffect(() => {
    getTodayData(todayData);
  }, [todayData]);

  let todayPage  = (
    <TodayDetailed
      todayTodos={todayData}
      todayTotalHours={todayTotalHours}
      categoryHours={details}
      togglePage={togglePage}
    ></TodayDetailed>
  );
  let weekPage = (<Week></Week>);
  let monthPage = (<Month></Month>);

  if (pageStatus.home) {
    page = (
      <Container sx={{p: 2}} maxWidth='sm'>
        <h1>Reports</h1>
        <Stack sx={{mx: 2}} spacing={2}>
          <Today togglePage={togglePage} totalHours={todayTotalHours}></Today>
          <Week></Week>
          <Month></Month>
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