import React from 'react';
import { Link } from "react-router-dom";
import { Box, Button, IconButton, Menu, MenuItem, AppBar, Toolbar, Tooltip, Typography } from '@mui/material';
import { MdAdd, MdOutlineIosShare, MdPerson } from 'react-icons/md';
import { BsCalendar4Week } from 'react-icons/bs';
import { MdChecklist } from 'react-icons/md';
import MonthlyCalendar from './MonthlyCalendar';
import { getDate } from './utils/helper';
interface Props {
    date: string;
    setDate: React.Dispatch<React.SetStateAction<string>>;
    setToggleUnscheduledTodo: React.Dispatch<React.SetStateAction<boolean>>
}

const Nav: React.FC<Props> = ({ date, setDate, setToggleUnscheduledTodo }) => {
    const now = getDate(new Date());
    const [anchorUserEl, setAnchorUserEl] = React.useState<null | HTMLElement>(null);
    const [anchorCalEl, setAnchorCalEl] = React.useState<null | HTMLElement>(null);


    const handleCalMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorCalEl(event.currentTarget);
    };

    const handleCalClose = () => {
        setAnchorCalEl(null);
    };

    const handleUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorUserEl(event.currentTarget);
    };

    const handleUserClose = () => {
        setAnchorUserEl(null);
    };

    return (
        <>
            <AppBar position="static" sx={{ py: 2 }}>
                <Toolbar>
                    <Link to="/">
                        <Button
                            variant="contained"
                            color='info'
                            onClick={() => setDate(now)}
                            sx={{ mr: 2 }}
                        >
                            Today
                        </Button>
                    </Link>
                    <Box sx={{ flexGrow: 1 }}>
                        <Link to="/unscheduled">

                            <IconButton
                                aria-label="monthly calendar"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleCalMenu}
                                color='info'
                            >
                                <BsCalendar4Week size={30} />
                            </IconButton>
                        </Link>
                        <Menu
                            id="account-menu"
                            anchorEl={anchorCalEl}
                            open={Boolean(anchorCalEl)}
                            onClose={handleCalClose}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&:before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        left: 95,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <MenuItem>
                                <MonthlyCalendar date={date} setDate={setDate} handleCalClose={handleCalClose} />
                            </MenuItem>
                        </Menu>
                    </Box>
                    <Tooltip title="Unscheduled todo list">
                        <IconButton sx={{ color: '#fff' }} aria-label="unscheduled todo list" onClick={() => setToggleUnscheduledTodo(true)}>
                            <MdChecklist size={30} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Add a todo">
                        <Link to="/create_todo">
                            <IconButton sx={{ color: '#fff' }} aria-label="add todo">
                                <MdAdd size={30} />
                            </IconButton>
                        </Link>
                    </Tooltip>
                    <Tooltip title="Share with friends">
                        <IconButton color="secondary" aria-label="share with friends">
                            <MdOutlineIosShare size={30} />
                        </IconButton>
                    </Tooltip>
                    <Box>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleUserMenu}
                            color='info'
                        >
                            <MdPerson size={30} />
                        </IconButton>
                        <Menu
                            id="account-menu"
                            anchorEl={anchorUserEl}
                            open={Boolean(anchorUserEl)}
                            onClose={handleUserClose}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&:before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <MenuItem onClick={handleUserClose} >Report</MenuItem>
                            <MenuItem onClick={handleUserClose}>Profile</MenuItem>
                            <MenuItem onClick={handleUserClose}>Log out</MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    );
}

export default Nav;