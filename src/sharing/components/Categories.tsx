import { Container, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { Circle } from "@mui/icons-material";
import { red } from "@mui/material/colors";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import Todos from "./Todos";
import { useState } from "react";
import React from "react";

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

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      {
        categories.map((category) => (
          <>
            <ListItemButton onClick={handleClick}>
              <ListItemIcon> < Circle sx={{ color: red[500] }} /> </ListItemIcon>
              <ListItemText> {category.name} </ListItemText>
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Todos name={category.name} todos={category.todos}/>
              </List>
            </Collapse>
          </>
        ))
      }
    </>
  );
}

export default Categories;