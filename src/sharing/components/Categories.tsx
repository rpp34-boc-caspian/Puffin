import { Container, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { Circle } from "@mui/icons-material";
import { red } from "@mui/material/colors";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import Todos from "./Todos";
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

interface user {
  username: string,
  calendar: string,
  categories: category[],
  friends: string[]
}

const Categories: React.FC<user> = ({ username, calendar, categories, friends }) => {
  const [open, setOpen] = React.useState(true);

  const handleClick = (event: any) => {
    console.log(event.target.key);
    setOpen(!open);
  };

  const [state, setState] = React.useState({
    trust: false
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const {trust} = state;


  return (
    <>
      {
        categories.map((category) => (
          <>
            {/* <FormControl component="fieldset" variant="standard">
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox checked={calendar} onChange={handleChange} name="calendar" />
                  }
                  label={'calendar'}
                />
              </FormGroup>
            </FormControl> */}
            <ListItemButton onClick={handleClick} key={category.name}>
              <FormControlLabel
                  control={
                    <Checkbox checked={trust} onChange={handleChange} name="trust" />
                  }
                  label={category.name}
                />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Todos name={category.name} todos={category.todos} />
              </List>
            </Collapse>
          </>
        ))
      }
    </>
  );
}

export default Categories;