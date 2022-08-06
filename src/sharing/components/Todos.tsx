import { Container, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { Circle } from "@mui/icons-material";
import { red } from "@mui/material/colors";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import { useState } from "react";
import React from "react";
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { toEditorSettings } from "typescript";
import {colorMap} from '../../theme';

interface Props {
  todoState: any,
  setTodoState: any,
  name: string,
  check: boolean,
  cat_id: number,
  todos: todo[],
  color: number
}

interface todo {
  name: string,
  cat_id: number,
  todo_id: number
}


const Todos: React.FC<Props> = ({ check, name, todos, color, todoState, setTodoState, cat_id}) => {
  // let todoTemp: any = {};
  // for (var i = 0; i < todos.length; i++) {
  //   todoTemp[todos[i].todo_id] = check ? true : false;
  // }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoState({
      ...todoState,
      [event.target.name]: !todoState[event.target.name] // {key: [string]: string }
    });
    console.log(todoState);
  };

  return (
    <FormControl component="fieldset" variant="standard" sx={{ pl: 4 }}>
      {
        todos.map((todo) => (
              <FormGroup key={todo.todo_id}>
                <FormControlLabel
                  control={
                    <Checkbox checked={check || todoState[todo.todo_id]} onChange={handleChange} name={`${todo.todo_id}`} sx={{color: colorMap[color]}} style={{color: colorMap[color]}}/>
                  }
                  label={todo.name}
                />
              </FormGroup>
        ))
      }
    </FormControl>
  );
}

export default Todos;