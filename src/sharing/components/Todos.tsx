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


interface todo {
  title: string,
  complete: boolean,
  permission: number,
}

interface category {
  check: boolean,
  name: string,
  todos: string[],
  color: number
}

const Todos: React.FC<category> = ({ check, name, todos, color }) => {
  const todoState : any = {};

  for (var i = 0; i < todos.length; i++) {
    todoState[todos[i]] = todoState.categoryChecked ? true : false;
  }

  const [state, setState] = React.useState(todoState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: !state[event.target.name] // {key: [string]: string }
    });
  };

  return (
    <FormControl component="fieldset" variant="standard" sx={{ pl: 4 }}>
      {
        todos.map((todo) => (
              <FormGroup key={todo}>
                <FormControlLabel
                  control={
                    <Checkbox checked={check || state[todo]} onChange={handleChange} name={todo} sx={{color: colorMap[color]}}/>
                  }
                  label={todo}
                />
              </FormGroup>
        ))
      }
    </FormControl>
  );
}

export default Todos;