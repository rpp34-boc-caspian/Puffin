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


interface todo {
  title: string,
  complete: boolean,
  permission: number
}

interface category {
  name: string,
  todos: todo[]
}

const Friends: React.FC<category> = ({ name, todos }) => {
  const [state, setState] = React.useState({
    calendar: false
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const { calendar } = state;
  return (
    <FormControl component="fieldset" variant="standard" sx={{ pl: 4 }}>
      <FormGroup>
      {
        todos.map((todo) => (
                <FormControlLabel
                  control={
                    <Checkbox checked={calendar} onChange={handleChange} name={todo.title} />
                  }
                  label={todo.title}
                />
        ))
      }
      </FormGroup>
    </FormControl>
  );
}

export default Friends;