import { Container, Grid, Stack } from "@mui/material"
import { useEffect, useState } from "react"
import { TodayMonth } from "./components/TodayMonth"
import { Week } from "./components/Week"
import { Detailed } from "./components/Detailed"
import { getToDoHours } from "./components/helpers/helpers"
import { DoughnutChart } from "./components/charts/DoughnutChart"
import CloseIcon from '@mui/icons-material/Close';
import { Link } from "react-router-dom"

interface userTodo {
  title: string,
  start_d: string,
  end_d: string,
  category_name: string,
  color: number,
  todo_id: number
}

interface allTodos {
  todos?: userTodo[],
  user_id: number,
  updateMetricsData: React.Dispatch<React.SetStateAction<{
    title: string;
    start_d: string;
    end_d: string;
    category_name: string;
    color: number;
    todo_id: number;
}[]>>
}

export const Metrics = (props: allTodos) => {

  const [todayData, updateTodayMetrics] = useState([]);
  const [todayTotalHours, setTodayTotalHours] = useState(0);
  const [todayCategoryTotalHours, setTodayCategoryHours] = useState(0);
  const [todayCategoryColors, setTodayCategoryColors] = useState([]);
  const [weekData, updateWeekMetrics] = useState([]);
  const [weekTotalHours, setWeekTotalHours] = useState(0);
  const [weekCategoryTotalHours, setWeekCategoryHours] = useState(0);
  const [monthData, updateMonthMetrics] = useState([]);
  const [monthTotalHours, setMonthTotalHours] = useState(0);
  const [monthCategoryHours, setMonthCategoryHours] = useState(0);
  const [monthCategoryColors, setMonthCategoryColors] = useState([]);
  const [pageStatus, togglePage] = useState({
    home: true,
    today: false,
    week: false,
    month: false
  })

  const getHoursAndSetState = (todos: any, timeFrame: string) => {
    let hours = 0;
    let details: any = {};
    let colors: any = [];

    todos.forEach((todo: userTodo) => {
      let total = getToDoHours(todo);
      hours += total;

      if (details[todo.category_name] === undefined) {
        details[todo.category_name]  = total;
        colors.push(todo.color);
      } else {
        details[todo.category_name] += total;
      }
    });

    if (timeFrame === 'today') {
      if (Number.isInteger(hours)) {
        setTodayTotalHours(hours);
        setTodayCategoryHours(details);
        updateTodayMetrics(todos);
        setTodayCategoryColors(colors);
      } else {
        setTodayTotalHours(+hours.toFixed(2));
        setTodayCategoryHours(details);
        updateTodayMetrics(todos);
        setTodayCategoryColors(colors);
      }
    }

    if (timeFrame === 'week') {
      if (Number.isInteger(hours)) {
        setWeekTotalHours(hours);
        setWeekCategoryHours(details);
        updateWeekMetrics(todos);
      } else {
        setWeekTotalHours(+hours.toFixed(2));
        setWeekCategoryHours(details);
        updateWeekMetrics(todos);
      }
    }

    if (timeFrame === 'month') {
      if (Number.isInteger(hours)) {
        setMonthTotalHours(hours);
        setMonthCategoryHours(details);
        updateMonthMetrics(todos);
        setMonthCategoryColors(colors);
      } else {
        setMonthTotalHours(+hours.toFixed(2));
        setMonthCategoryHours(details);
        updateMonthMetrics(todos);
        setMonthCategoryColors(colors);
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
        let todoDate = new Date(todo.start_d);
        let todoMonth = todoDate.getMonth();
        let todoYear = todoDate.getFullYear();
        let todoDateString = todoDate.toDateString();
        let todoDateParsed = Date.parse(todo.start_d);
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
        if (firstDayParsed <= todoDateParsed && lastDayParsed >= todoDateParsed) {
          thisWeek.push(todo);
        }
        if (todoMonth === currentDateMonth && todoYear === currentDateYear) {
          thisMonth.push(todo);
        }
      });

      if (today.length) {getHoursAndSetState(today, 'today')};
      if (thisWeek.length) {getHoursAndSetState(thisWeek, 'week')};
      if (thisMonth.length) {getHoursAndSetState(thisMonth, 'month')};
    }
    if (props.todos) {
      loadData(props.todos);
    }

  }, [props.todos]);

  let page = (
    <Container sx={{p: 2}} maxWidth='sm'>
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
      >
        <Link to="/">
          <CloseIcon></CloseIcon>
        </Link>
      </Grid>
      <h1>Reports</h1>
      <Stack sx={{mx: 2}} spacing={2}>
        <TodayMonth
          togglePage={togglePage}
          totalHours={todayTotalHours}
          categories={todayCategoryTotalHours}
          colors={todayCategoryColors}
          chart={(data: any) => <DoughnutChart data={data}/>}
          title="Today's Report"
        ></TodayMonth>
        <Week
          togglePage={togglePage}
          totalHours={weekTotalHours}
          categories={weekCategoryTotalHours}
          todos={weekData}
        ></Week>
        <TodayMonth
          togglePage={togglePage}
          totalHours={monthTotalHours}
          categories={monthCategoryHours}
          colors={monthCategoryColors}
          chart={(data: any) => <DoughnutChart data={data}/>}
          title="This Month's Report"
        ></TodayMonth>
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
      user_id={props.user_id}
      updateMetricsData={props.updateMetricsData}
    ></Detailed>
  );

  let weekPage = (
    <Detailed
      todos={weekData}
      totalHours={weekTotalHours}
      categoryHours={weekCategoryTotalHours}
      togglePage={togglePage}
      timeFrame="This Week"
      user_id={props.user_id}
      updateMetricsData={props.updateMetricsData}
    ></Detailed>
  );

  let monthPage = (
    <Detailed
      todos={monthData}
      totalHours={monthTotalHours}
      categoryHours={monthCategoryHours}
      togglePage={togglePage}
      timeFrame="This Month"
      user_id={props.user_id}
      updateMetricsData={props.updateMetricsData}
    ></Detailed>
  );

  if (pageStatus.home) {
    page = (
        <Container sx={{p: 2}} maxWidth='sm'>
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center">
            <Link to="/">
              <CloseIcon></CloseIcon>
            </Link>
          </Grid>
          <h1>Reports</h1>
          <Stack sx={{mx: 2}} spacing={2}>
            <TodayMonth
              togglePage={togglePage}
              totalHours={todayTotalHours}
              categories={todayCategoryTotalHours}
              colors={todayCategoryColors}
              chart={(data: any) => <DoughnutChart data={data}/>}
              title="Today's Report"
            ></TodayMonth>
            <Week
              togglePage={togglePage}
              totalHours={weekTotalHours}
              categories={weekCategoryTotalHours}
              todos={weekData}
            ></Week>
            <TodayMonth
              togglePage={togglePage}
              totalHours={monthTotalHours}
              categories={monthCategoryHours}
              colors={monthCategoryColors}
              chart={(data: any) => <DoughnutChart data={data}/>}
              title="This Month's Report"
            ></TodayMonth>
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