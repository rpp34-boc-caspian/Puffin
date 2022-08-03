import { Box, Card, CardContent, CardHeader, IconButton, List, ListItem, ListItemAvatar, ListItemText, Modal, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RectangleIcon from '@mui/icons-material/Rectangle';
import { colorMap } from "../../theme";
import { useState } from "react";
import { id } from "date-fns/locale";
import { getToDoHours } from "./helpers/helpers";


interface userTodo {
  title: string,
  start_d: string,
  end_d: string,
  category_name: string,
  color: number,
  id: number
}
interface allTodos {
  todos: userTodo[],
  categoryName: string,
  categoryHours: number,
  togglePage: React.Dispatch<React.SetStateAction<{
    home: boolean;
    today: boolean;
    week: boolean;
    month: boolean;
  }>>
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



export const CategoryDetailed = (props: allTodos) => {
  const [modalOpen, setModal] = useState(false);
  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);
  const [clickedTodoTitle, setTitle] = useState('');
  const [clickedTodoId, setId] = useState(0);
  const [clickedTodoHours, setHours] = useState(0);


  const getTitleName = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const target = e.currentTarget as HTMLLIElement;
    const todoTitle = target.title;
    const todoId = target.value;
    console.log(todoTitle)
    console.log(todoId)
    setTitle(todoTitle);
    setId(todoId);
    const clickedTodoData = props.todos.filter((todos) => todos.id === todoId)[0]
    console.log(clickedTodoData);
    setHours(getToDoHours(clickedTodoData))
    modalOpen ? closeModal() : openModal();
  }

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
          {props.todos.map((todo) => {
            let todoTotal = getToDoHours(todo);
            return (
              <ListItem
                title={todo.title}
                onClick={(e) => getTitleName(e)}
                value={todo.id}
                key={`${todo.start_d}${todo.title}`}
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
      <Modal open={modalOpen} onClose={closeModal}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {clickedTodoTitle}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {clickedTodoHours}
          </Typography>
        </Box>
      </Modal>
    </Card>
  )
}