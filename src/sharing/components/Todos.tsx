import { Container, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { Circle } from "@mui/icons-material";
import { red } from "@mui/material/colors";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
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

const Todos: React.FC<category> = ({ name, todos }) => {
  return (
    <>
      {
        todos.map((todo) => (
          <>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primary={todo.title} />
          </ListItemButton>
          </>
        ))
      }
    </>
  );
}

export default Todos;