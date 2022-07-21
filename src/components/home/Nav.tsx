import React from 'react';
import {Box, Button, IconButton, Menu, MenuItem, Typography} from '@mui/material';
import {MdAdd, MdOutlineIosShare, MdPerson} from 'react-icons/md';
import MonthlyCalendar from './MonthlyCalendar';

const Nav = () => {
    const now = new Data().toLocaleDateString()
    const [date, setDate] = React.useState<Date | null>(now);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [showCal, setShowCal] = React.useState(false);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
      };
    
    const handleClose = () => {
    setAnchorEl(null);
    };
    return(
        <div>
            <Box
                sx={{
                    height: '100%',
                    bgcolor: 'primary.main',
                }}
            >
                <Button variant="contained" color='info'>
                    Today
                </Button>
                <Typography variant="h4">{date}</Typography>
                <MonthlyCalendar date={date} setDate={setDate}/>
                <IconButton sx={{color: '#fff'}} aria-label="add todo">
                    <MdAdd size={40}/>
                </IconButton>
                <IconButton color="secondary" aria-label="share with friends">
                    <MdOutlineIosShare size={40}/>
                </IconButton>
                <span>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color='info'
                    >
                        <MdPerson size={40}/>
                    </IconButton>
                    <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>Log out</MenuItem>
                </Menu>
                </span>
            </Box>
        </div>
    )
}

export default Nav;