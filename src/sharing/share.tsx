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

interface friend {
  name: string,
  permissions: number
}

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
        ],
        color: 4
      },
      {
        name: 'Study',
        todos: [
          {
            title: 'Science',
            complete: false,
            permission: 1
          }
        ],
        color: 2
      },
      {
        name: 'Sport',
        todos: [
          {
            title: 'Tennis',
            complete: false,
            permission: 1
          },
          {
            title: 'Basketball',
            complete: false,
            permission: 1
          },
          {
            title: 'Football',
            complete: false,
            permission: 1
          },
          {
            title: 'American Football',
            complete: false,
            permission: 1
          }
        ],
        color: 9
      },
    ],

    friends: ['Tim', 'Sarah', 'Mandy', 'Luna', 'Joshua', 'Michael', 'Martin', 'Luke']
  }

  const options = userEx.friends;
  const access : friend[] = [];

  const [state, setState] = React.useState({
    calendar: false,
    friends: userEx.friends,
    friendsAccess: access
  });

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
            label={userEx.calendar}
          />
        </FormGroup>
      </FormControl>
      <Categories calendarChecked={state.calendar} username={userEx.username} categories={userEx.categories} calendar={userEx.calendar} friends={state.friends} />
      <div>
        <PeopleAltIcon />
        <label>
          Share With Friends
        </label>
        <AddIcon onClick={handleClickOpenAdd}></AddIcon>
      </div>
      <Friends friends={state.friendsAccess}/>
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