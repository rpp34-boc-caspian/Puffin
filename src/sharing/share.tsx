import { Container, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import Categories from "./components/Categories";
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
import { Link } from "react-router-dom"
import {formatData, userEx, catClean, todoClean, catData, cleanAccess, parseUsers} from './components/helpers/helpers';
import axios from "axios";
import { createStatement } from "typescript";
import { set } from "date-fns";


interface friends {
  names: string[]
}

interface user {
  userId: number,
  calendar: string,
  categories: category[],
  friends: string[]
}

interface category {
  name: string,
  cat_id: number,
  todos: todo[],
  color: number
}

interface todo {
  name: string,
  cat_id: number,
  todo_id: number
}

interface permission {
    email: string,
    id: number,
    permission: number
}


export const Share = (data: any) => {

  const options = userEx.friends;
  const fAccess : friends = {names: []};
  const [state, setState] = React.useState({
    friends: userEx.friends,
  });

  const [friendAccess, setFriendAccess] = React.useState<string[]>([]);
  const [calState, setCalState] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(formatData(data.data));
  const [permissions, setPermissions] = React.useState<any>({});
  const [value, setValue] = React.useState<string | ''>(`${state.friends[0]}`);
  const [inputValue, setInputValue] = React.useState('');
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openShare, setOpenShare] = React.useState(false);
  const [openFriend, setOpenFriend] = React.useState(false);
  const [catState, setCatState] = React.useState(catClean(data.data));
  const [todoState, setTodoState] = React.useState({});
  const [catMeta, setCatMeta] = React.useState({});
  const [access, setAccess] = React.useState(cleanAccess(data.friendsData.rows));

  useEffect(() => {
    setCurrentUser(formatData(data.data));
    setAccess(cleanAccess(data.friendsData.rows))
    setCatMeta(catData(currentUser.categories));
    setCatState(() => {
      return {
        ...catClean(data.data),
        ...catState
      }
    });

    setTodoState(() => {
      return {
        ...todoClean(data.data),
        ...todoState
      }
    });

    setAccess(() => {
      return {
        ...cleanAccess(data.friendsData.rows),
        ...access
      }
    });

    let updatedFriends: any = axios.get(`http://127.0.0.1:8080/share/friends/${currentUser.userId}`);

    axios.all([updatedFriends])
      .then(axios.spread((...shareData) => {
        let permissions: any = {};
        for (var i = 0; i < shareData[0].data.rows.length; i++) {
          permissions[shareData[0].data.rows[i].email] = {
            id: shareData[0].data.rows[i].friend_id,
            permission: 0
          }
        }
        setPermissions(() => {
          return {
            ...permissions
          }
        });
        let friendList = shareData[0].data.rows.map((row: any) => {
          return `${row.email} [${row.username}]`;
        })
        setState({
          ...state,
          friends: friendList
        })
      }))
      .catch((error) => {
        console.log(error)
      })
  }, [state, currentUser.userId, data.data, data.friendsData.rows]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let temp : any = {};
    let temp2: any = {};
    for (const key in catState) {
      temp[key] = !calState;
    }
    for (const key in todoState) {
      temp2[key] = !calState;
    }
    setCalState(!calState);
    setCatState(temp);
    setTodoState(temp2);
  };

  const handleClickOpenAdd = () => {
    setValue(state.friends[0]);
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleDoAdd = () => {
    setOpenAdd(false);
    let email = value.split(" ")[0];
    setFriendAccess([...friendAccess, email]);

    // const newFriend = {
    //   name: 'One',
    //   permissions: 0
    // }
    // setState({
    //   ...state,
    //   friends: [...state.friends, newFriend.name],
    //   friendsAccess: [...state.friendsAccess, newFriend]
    // });
  };

  const handleClickOpenShare = () => {
    setOpenShare(true);
    setFriendAccess([]);
    // axios({
    //   method: 'get',
    //   url: 'http://127.0.0.1:8080/share/perm/1/6/1',
    // })
    // .then((response) => {
    //   console.log(response.data);
    //   if(response.data.length === 0) {
    //     axios({
    //       method: 'post',
    //       url: 'http://127.0.0.1:8080/share/permissions/1',
    //       data: {
    //         friend_id: 6,
    //         cal_share: false,
    //         cat_id: 1,
    //         cat_share: false,
    //         todo_id: 1,
    //         permission: 1
    //       }
    //     })
    //   } else {
    //     axios({
    //       method: 'put',
    //       url: 'http://127.0.0.1:8080/share/permissions/1',
    //       data: {
    //         friend_id: 6,
    //         cal_share: false,
    //         cat_id: 1,
    //         cat_share: false,
    //         todo_id: 1,
    //         permission: 0
    //       }
    //     })
    //   }
    // })
  };

  const handleCloseShare = () => {
    setOpenShare(false);
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
        <Link to='/'>
          <CloseIcon />
        </Link>
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
              <Checkbox checked={calState} onChange={handleChange} name="calendar" />
            }
            label={currentUser.calendar}
          />
        </FormGroup>
      </FormControl>
      <Categories cData={catMeta} catState={catState} setCatState={setCatState} todoState={todoState} setTodoState={setTodoState} calendarChecked={calState} categories={currentUser.categories} calendar={currentUser.calendar} friends={state.friends} />
      <div>
        <PeopleAltIcon />
        <label>
          Share With Friends
        </label>
        <AddIcon onClick={handleClickOpenAdd}></AddIcon>
      </div>
      <Friends friends={friendAccess} setState={setState} permissions={permissions} setPermissions={setPermissions} map={parseUsers(data.usersData)}/>
      <Dialog open={openAdd} onClose={handleCloseAdd}>
        <DialogTitle>Share with Friend</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Select friend to share with.
          </DialogContentText>
          <Autocomplete
            value={value}
            onChange={(event: any, newValue: string | null) => {
              if (newValue === null) {
                newValue = '';
              }
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
          <Button onClick={handleClickOpenShare} variant="contained" color="secondary" sx={{ height: 40 }}>
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
    </Container>
  );
};
