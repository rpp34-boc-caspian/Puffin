import { Container, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { Circle } from "@mui/icons-material";
import Categories from "./components/Categories";
import internal from "stream";
import { red } from "@mui/material/colors";
import React from 'react';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


export const Share = () => {
  const userEx =
  {
    username: 'Mandy',
    calendar: 'Mandy Cal',
    categories: [
      {
        name: 'Eat',
        todos: [
          {
            title: 'Broccoli',
            complete: false,
            permission: 1
          },
          {
            title: 'Cheese',
            complete: false,
            permission: 1
          },
        ]
      },
      {
        name: 'Study',
        todos: [
          {
            title: 'Science',
            complete: false,
            permission: 1
          }
        ]
      }
    ],
    friends: ['Tim', 'Sarah']
  }

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
    <Container>
      <div>
        <h1>
          Sharing With Friends
        </h1>
        <h2>
          Select Calendar / Categories / Events
        </h2>
      </div>
      <FormControl component="fieldset" variant="standard">
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={calendar} onChange={handleChange} name="calendar" />
            }
            label={userEx.calendar}
          />
        </FormGroup>
      </FormControl>
      <Categories calendarChecked={calendar} username={userEx.username} categories={userEx.categories} calendar={userEx.calendar} friends={userEx.friends}/>
      <div>
        <label>
          Share With Friends
        </label>
      </div>
      <div>
        <label>
          Add Friends
        </label>
      </div>
    </Container>
  );
};