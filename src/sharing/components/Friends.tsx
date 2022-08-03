import { Container, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { Circle } from "@mui/icons-material";
import { red } from "@mui/material/colors";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import Todos from "./Todos";
import { Fragment, useState } from "react";
import React from "react";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { colorMap } from '../../theme';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


interface todo {
  title: string,
  complete: boolean,
  permission: number
}

interface category {
  name: string,
  color: number,
  todos: todo[]
}

interface user {
  username: string,
  calendar: string,
  calendarChecked: Boolean,
  categories: category[],
  friends: string[]
}

interface friend {
  name: string,
  permissions: number
}

interface friends {
  friends: friend[]
}

const Friends: React.FC<friends> = ({ friends }) => {

  const catState: any = {
    calendarChecked: false
  };

  const expandState: any = {}

  const [state, setState] = React.useState(catState);

  const [open, setOpen] = React.useState(expandState);

  const [addFriends, setFriendAdds] = React.useState([]);

  // const handleFriend = (
  //   event: any,
  //   user: string
  // ) => {
  //   setFriendAdds([...addFriends, user])
  // };

  const [per, setPer] = React.useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setPer(event.target.value as string);
  };


  return (
    <>
      {
        friends.map((friend) => (
          <Fragment key={friend.name}>
            <Box component='span' sx={{ minWidth: 120 }}>
              <div>
              {friend.name}
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label">Permission</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={per}
                  label="Name"
                  onChange={handleChange}
                >
                  <MenuItem value={0}>View</MenuItem>
                  <MenuItem value={1}>Edit</MenuItem>
                </Select>
              </FormControl>
              </div>
            </Box>
          </Fragment>
        ))
      }
    </>
  );
}

export default Friends;