import { Box, Button, Card, CardContent, CardHeader, IconButton, List, ListItem, ListItemAvatar, ListItemText, Modal, Slider, styled, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RectangleIcon from '@mui/icons-material/Rectangle';
import { colorMap } from "../../theme";
import { useState } from "react";
import { getToDoHours, sliderStyle } from "./helpers/helpers";
import axios from "axios";


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
  }>>,
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

export const CategoryDetailed = (props: allTodos) => {
  const [modalOpen, setModal] = useState(false);
  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);
  const [clickedTodoTitle, setTitle] = useState('');
  const [clickedTodoId, setId] = useState(0);
  const [clickedTodoHours, setHours] = useState(0);
  const [clickedTodoStartTime, setStartTime] = useState('');

  const UpdateTimeSlider = styled(Slider)({
    color: '#0d47a1',
    height: 8,
    '& .MuiSlider-track': {
      border: 'none',
    },
    '& .MuiSlider-thumb': {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        boxShadow: 'inherit',
      },
      '&:before': {
        display: 'none',
      },
    },
    '& .MuiSlider-valueLabel': {
      lineHeight: 1.2,
      fontSize: 12,
      background: 'unset',
      padding: 0,
      width: 32,
      height: 32,
      borderRadius: '50% 50% 50% 0',
      backgroundColor: '#0d47a1',
      transformOrigin: 'bottom left',
      transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
      '&:before': { display: 'none' },
      '&.MuiSlider-valueLabelOpen': {
        transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
      },
      '& > *': {
        transform: 'rotate(45deg)',
      },
    },
  });

  const updateTodoTime = (id: number, start: string, hours: number) => {
    const milliToHours = (hours: number) => {
      return hours * 3600000;
    }
    let m = milliToHours(hours);
    let startD = new Date(start);
    let update = new Date();
    update.setTime(startD.getTime())
    update.setTime(startD.getTime() + m)
    let end_d = update.toISOString();
    let start_d = startD.toISOString()
    axios.put('http://127.0.0.1:8080/updateTodoTime/', {end_d, id, start_d, user_id: props.user_id})
      .then((data) => {
        props.updateMetricsData(data.data);
        closeModal()
      })
      .catch((err) => {
        closeModal()
        console.log('UPDATE ERROR:', err)
      })
  }

  const getTitleName = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const target = e.currentTarget as HTMLLIElement;
    const todoTitle = target.title;
    const todoId = target.value;
    const clickedTodoData = props.todos.filter((todos) => todos.id === todoId)[0];
    setTitle(todoTitle);
    setId(todoId);
    setStartTime(clickedTodoData.start_d);
    setHours(getToDoHours(clickedTodoData))
    modalOpen ? closeModal() : openModal();
  }

  const handleSliderChange = (e: Event | React.SyntheticEvent<Element, Event>, value: number | number[]) => {
    setHours(value as number);
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
        <Box sx={sliderStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {clickedTodoTitle}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {`${clickedTodoHours} hours`}
          </Typography>
          <UpdateTimeSlider
            valueLabelDisplay="auto"
            aria-label="pretto slider"
            defaultValue={clickedTodoHours}
            max={24}
            onChangeCommitted={handleSliderChange}
          />
          <Button onClick={() => updateTodoTime(clickedTodoId, clickedTodoStartTime, clickedTodoHours)}>
            Update
          </Button>
        </Box>
      </Modal>
    </Card>
  )
}