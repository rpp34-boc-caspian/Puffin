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


interface todo {
  title: string ,
  complete: boolean,
  permission: number
}

interface category {
  name: string,
  color: number,
  todos: string[]
}

interface user {
  calendar: string,
  calendarChecked: Boolean,
  categories: category[],
  friends: string[]
}

const Categories: React.FC<user> = ({ calendarChecked, calendar, categories, friends }) => {
  const catState : any = {
    calendarChecked: false
  };

  const expandState : any = {}

  //Create the states for each category
  for (var i = 0; i < categories.length; i++) {
    catState[categories[i].name] = catState.calendarChecked ? true : false;
    expandState[categories[i].name] = false;
  }

  const [state, setState] = React.useState(catState);

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

            <ListItemButton onClick={(event) => handleClick(event, category.name)}>
              <FormControlLabel
                  control={
                    <Checkbox checked={state[category.name] || calendarChecked} onChange={handleChange} name={category.name} sx={{color: colorMap[category.color]}}/>
                  }
                  label={category.name}
                />
              {open[category.name] ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open[category.name]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Todos check={state[category.name] || calendarChecked} name={category.name} todos={category.todos} color={category.color}/>
              </List>
            </Collapse>
          </Fragment>
        ))
      }
    </>
  );
}

export default Categories;