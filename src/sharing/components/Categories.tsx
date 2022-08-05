import { Container, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { Circle } from "@mui/icons-material";
import { red } from "@mui/material/colors";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import Todos from "./Todos";
import { Fragment, useState } from "react";
import React from "react";
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {colorMap} from '../../theme';
import { catData } from "./helpers/helpers";


interface todo {
  name: string,
  cat_id: number,
  todo_id: number
}

interface category {
  name: string,
  cat_id: number
  color: number,
  todos: todo[]
}

interface Props {
  cData: any,
  catState: any,
  setCatState: any,
  todoState: any,
  setTodoState: any,
  calendar: string,
  calendarChecked: boolean,
  categories: category[],
  friends: string[]
}

const Categories: React.FC<Props> = ({ cData, catState, setCatState, calendarChecked, calendar, categories, friends, todoState, setTodoState}) => {
  const expandState : any = {};
  const [open, setOpen] = React.useState(expandState);

  const handleClick = (
    event: any,
    cat: string
  ) => {
    setOpen({
      ...open,
      [cat] : !open[cat]
    });
  };


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let temp : any = {};
    for (var i = 0; i < cData[event.target.name].length; i++) {
      temp[cData[event.target.name][i]] = !catState[event.target.name];
    }
    setCatState({
      ...catState,
      [event.target.name]: !catState[event.target.name]
    });
    setTodoState({
      ...todoState,
      ...temp
    })
  };


  return (
    <>
      {
        categories.map((category) => (
          <Fragment key={category.cat_id}>

            <ListItemButton onClick={(event) => handleClick(event, category.name)}>
              <FormControlLabel
                  control={
                    <Checkbox checked={calendarChecked || catState[category.cat_id]} onChange={handleChange} name={`${category.cat_id}`} sx={{color: colorMap[category.color]}} style={{color: colorMap[category.color]}}/>
                  }
                  label={category.name}
                />
              {open[category.name] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open[category.name]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Todos check={catState[category.cat_id] || calendarChecked} name={category.name} todos={category.todos} color={category.color} todoState={todoState} setTodoState={setTodoState} cat_id={category.cat_id}/>
              </List>
            </Collapse>
          </Fragment>
        ))
      }
    </>
  );
}

export default Categories;