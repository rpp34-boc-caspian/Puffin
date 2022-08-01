import { Container, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { Circle, ReorderTwoTone } from "@mui/icons-material";
import Categories from "./components/Categories";
import internal from "stream";
import { red } from "@mui/material/colors";
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { BsCalendar4Week } from 'react-icons/bs';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Friends from "./components/Friends";
import React, { useEffect, useState } from 'react';
import { format } from "path";


interface friend {
  name: string,
  permissions: number
}

interface user {
  calendar: string,
  categories: category[],
  friends: string[]
}

interface category {
  name: string,
  todos: string[],
  color: number
}

export const Share = (data: any) => {
  const userEx =
  {
    calendar: 'Mandy Cal',
    categories: [
      {
        name: 'Eat',
        todos: [
          'Broccoli',
          'Cheese'
        ],
        color: 4
      },
      {
        name: 'Study',
        todos: [],
        color: 2
      },
      {
        name: 'Sport',
        todos: [
            'Tennis',
            'Basketball',
            'Football',
            'American Football'
        ],
        color: 9
      },
    ],

    friends: ['Tim', 'Sarah', 'Mandy', 'Luna', 'Joshua', 'Michael', 'Martin', 'Luke']
  }

  const options = userEx.friends;
  const access : friend[] = [];
  const user : user = userEx;

  const [state, setState] = React.useState({
    user: user,
    calendar: false,
    friends: userEx.friends,
    friendsAccess: access
  });

  const formatData = (rows: any) => {
    const no_cat : category[] = [];
    const empty : string[] = [];
    const user: user = {
      calendar: '',
      categories: no_cat,
      friends: empty
    };

    for (var i = 0; i < rows.length; i++) {
      var isFound = false;
      if (user.calendar === '') {
        user.calendar = rows[i].cal_name;
      }
      for (var j = 0; j < user.categories.length; j++) {
        if (user.categories[j].name === rows[i].category_name) {
          user.categories[j].todos.push(rows[i].title);
          isFound = true;
          break;
        }
      }
      if (!isFound) {

        user.categories.push({
          name: rows[i].category_name,
          todos: rows[i].title === null ? empty : [rows[i].title],
          color: rows[i].color
        });
      }
    }

    setState({
      ...state,
      user: user
    });
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      calendar: !state.calendar
    });
  };

  const [value, setValue] = React.useState<string | null>(options[0]);
  const [inputValue, setInputValue] = React.useState('');



  const [openAdd, setOpenAdd] = React.useState(false);

  const handleClickOpenAdd = () => {
    console.log("rows", data);
    formatData(data.rows);
    console.log('DATA', state.user);
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleDoAdd = () => {
    const newFriend = {
      name: 'One',
      permissions: 0
    }
    setState({
      ...state,
      friendsAccess: [...state.friendsAccess, newFriend]
    });
  };

  const [openShare, setOpenShare] = React.useState(false);

  const handleClickOpenShare = () => {
    setOpenShare(true);
  };

  const handleCloseShare = () => {
    setOpenShare(false);
  };

  const [openFriend, setOpenFriend] = React.useState(false);

  const handleClickOpenFriend = () => {
    setOpenFriend(true);
  };

  const handleCloseFriend = () => {
    setOpenFriend(false);
    setState({
      ...state,
      friends: [...state.friends, 'Jim']
    });
    console.log(state.friends);
  };

  return (
    <Container>
      <Box
        component="span"
        m={1}
        display="flex"
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        <CloseIcon />
      </Box>
      <div>
        <h1>
          Sharing With Friends
        </h1>
        <h2>
          <BsCalendar4Week />
          Select Calendar / Categories / Events
        </h2>
      </div>
      <FormControl component="fieldset" variant="standard">
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={state.calendar} onChange={handleChange} name="calendar" />
            }
            label={state.user.calendar}
          />
        </FormGroup>
      </FormControl>
      <Categories calendarChecked={state.calendar} categories={state.user.categories} calendar={state.user.calendar} friends={state.friends} />
      <div>
        <PeopleAltIcon />
        <label>
          Share With Friends
        </label>
        <AddIcon onClick={handleClickOpenAdd}></AddIcon>
      </div>
      {/* <Friends friends={state.friendsAccess}/> */}
      <Dialog open={openAdd} onClose={handleCloseAdd}>
        <DialogTitle>Share with Friend</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Select friend to share with.
          </DialogContentText>
          <Autocomplete
            value={value}
            onChange={(event: any, newValue: string | null) => {
              setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            id="friend"
            options={state.friends}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Friends" />}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAdd}>Cancel</Button>
          <Button onClick={handleDoAdd}>Give Access</Button>
        </DialogActions>
      </Dialog>
      <div>
        <Box
          component="span"
          m={1}
          display="flex"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <Button variant="contained" color="secondary" sx={{ height: 40 }} onClick={handleClickOpenShare}>
            Share
          </Button>
        </Box>
        <Dialog open={openShare} onClose={handleCloseShare}>
        <DialogTitle>It's a Date!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You have just shared access to your to-dos.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseShare}>Close</Button>
        </DialogActions>
      </Dialog>
      </div>
      <div>
        <Box
          component="span"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Button onClick={handleClickOpenFriend}>Add Friends</Button>
          <Dialog open={openFriend} onClose={handleCloseFriend}>
        <DialogTitle>New Friend</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your friend's friend code.
          </DialogContentText>
          <TextField
            id="friendcode"
            label="Friend Code"
            helperText="Enter Friend Code."
            variant="filled"
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseFriend}>Close</Button>
          <Button onClick={handleCloseFriend}>Add</Button>
        </DialogActions>
      </Dialog>
        </Box>
         <Box
          component="span"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
        </Box>
      </div>
    </Container>
  );
};