import { Card, CardContent, CardHeader, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import RectangleIcon from '@mui/icons-material/Rectangle';
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
  todayTodos: userTodo[],
  categoryName: string,
  categoryHours: number
}

export const CategoryDetailed = (props: allTodos) => {
  const [totalHours, setTotalHours] = useState(0);
  const [details, setDetails] = useState(null);

  // useEffect(() => {

  // }, [totalHours, props.todayTodos])


  return (
    <Card>
      <CardContent>
        <CardHeader
          title={
            <Typography sx={{fontSize: 12}} color="text.secondary">
              {props.categoryName}
            </Typography>
          }
          subheader={
            <Typography fontWeight='bold' variant="h5">
              {props.categoryHours} hrs
            </Typography>
          }
          action={
            <IconButton>
              <InfoIcon/>
            </IconButton>
          }
        />
        <List>
          {props.todayTodos.map((todo) => {
            let beginTime = Date.parse(todo.start_date);
            let endTime = Date.parse(todo.end_date);
            let todoTotal = endTime - beginTime;
            todoTotal = todoTotal / 1000;
            todoTotal = todoTotal / 60;
            todoTotal = todoTotal / 60;
            if (!Number.isInteger(todoTotal)) {
              todoTotal = +todoTotal.toFixed(2);
            }
            return (
              <>
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" aria-label="total-hours-for-todo">
                      <Typography sx={{fontSize: 12}} color="text.secondary">
                        {`${todoTotal} hrs`}
                      </Typography>
                    </IconButton>
                  }>
                </ListItem>
                <ListItemText primary={todo.title}/>
                <ListItemAvatar>
                  <RectangleIcon color="primary"/>
                </ListItemAvatar>
              </>
            )
          })}
        </List>
      </CardContent>
    </Card>
  )
}