import { Card, CardContent, CardHeader, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RectangleIcon from '@mui/icons-material/Rectangle';
import { colorMap } from "../../theme";


interface userTodo {
  title: string,
  start_date: string,
  end_date: string,
  complete: boolean,
  username?: string,
  category: string,
  color: string
}
interface allTodos {
  todayTodos: userTodo[],
  categoryName: string,
  categoryHours: number,
  togglePage: React.Dispatch<React.SetStateAction<{
    home: boolean;
    today: boolean;
    week: boolean;
    month: boolean;
  }>>
}

export const CategoryDetailed = (props: allTodos) => {
  let formatedTimeTotal = props.categoryHours;
  if (!Number.isInteger(props.categoryHours)) {
    formatedTimeTotal = +(props.categoryHours.toFixed(2));
  }
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
              {formatedTimeTotal} hrs
            </Typography>
          }
          action={
            <IconButton  onClick={() => {
              props.togglePage({
                home: true,
                today: false,
                week: false,
                month: false
              })
            }}>
              <ArrowBackIcon/>
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
              todoTotal = +(todoTotal.toFixed(2));
            }
            return (
              <ListItem
                key={`${todo.start_date}${todo.title}`}
                secondaryAction={
                  <IconButton edge="end" aria-label="total-hours-for-todo">
                    <Typography sx={{fontSize: 12}} color="text.secondary">
                      {`${todoTotal} hrs`}
                    </Typography>
                  </IconButton>
                }>
                <ListItemAvatar>
                  <RectangleIcon htmlColor={colorMap[todo.color]}/>
                </ListItemAvatar>
                <ListItemText primary={todo.title}/>
              </ListItem>
            )
          })}
        </List>
      </CardContent>
    </Card>
  )
}