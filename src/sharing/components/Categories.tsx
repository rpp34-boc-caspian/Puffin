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
  calendarChecked: Boolean,
  categories: category[],
  friends: string[]
}

const Categories: React.FC<user> = ({ calendarChecked, username, calendar, categories, friends }) => {
  const [open, setOpen] = React.useState(true);

  const handleClick = (event: any) => {
    setOpen(!open);
  };

  const catState : any = {
    calendarChecked: false
  };

  for (var i = 0; i < categories.length; i++) {
    catState[categories[i].name] = catState.calendarChecked ? true : false;
  }

  const [state, setState] = React.useState(catState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: !state[event.target.name] // {key: [string]: string }
    });
  };



  return (
    <>
      {
        categories.map((category) => (
          <Fragment key={category.name}>
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
            <ListItemButton onClick={handleClick}>
              <FormControlLabel
                  control={
                    <Checkbox checked={state[category.name]} onChange={handleChange} name={category.name} />
                  }
                  label={category.name}
                />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Todos check={state[category.name]} name={category.name} todos={category.todos} />
              </List>
            </Collapse>
          </Fragment>
        ))
      }
    </>
  );
}

export default Categories;