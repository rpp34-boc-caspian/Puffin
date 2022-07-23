import { Card, CardContent, CardHeader, IconButton, Typography } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import { useEffect, useState } from "react";

interface userTodo {
  title: string,
  start_date: string,
  end_date: string,
  complete: boolean,
  username?: string,
  category: string
}
interface allTodos {
  todayTodos: userTodo[]
}

export const Today = (props: allTodos) => {
  const [totalHours, setTotalHours] = useState(0);
  const [details, setDetails] = useState(null);

  useEffect(() => {
    let hours = 0;
    let todaysDetails: any = {};
    if (props.todayTodos) {
      props.todayTodos.forEach((todo) => {
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
      setTotalHours(hours);
      setDetails(todaysDetails);
    }
  }, [totalHours, props.todayTodos])


  return (
    <Card>
      <CardContent>
        <CardHeader
          title={
            <Typography sx={{fontSize: 12}} color="text.secondary">
              Today's Report
            </Typography>
          }
          subheader={
            <Typography fontWeight='bold' variant="h5">
              {totalHours} hrs
            </Typography>
          }
          action={
            <IconButton>
              <InfoIcon/>
            </IconButton>
          }
        />
      </CardContent>
    </Card>
  )
}