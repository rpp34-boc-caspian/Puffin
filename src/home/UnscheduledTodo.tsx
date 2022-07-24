import * as React from 'react';
import { Global } from '@emotion/react';
import { styled, useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey} from '@mui/material/colors';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import {colorMap} from '../theme';
import {List, ListItem, ListItemButton, ListItemIcon, ListItemText, Checkbox, IconButton, Stack, Button, Snackbar} from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import {MdOutlineDelete} from 'react-icons/md';

const drawerBleeding = 56;

interface Props {
  window?: () => Window;
  toggleUnscheduledTodo: boolean;
  setToggleUnscheduledTodo: React.Dispatch<React.SetStateAction<boolean>>;
  setDraggedEvent: React.Dispatch<React.SetStateAction<object>>
}

const Puller = styled(Box)(() => ({
  width: 30,
  height: 6,
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));

const unscheduledList = [
    {
        id: 100,
        title: 'UI/UX conference',
        color: '1',
        complete: false
    },
    {
        id: 102,
        title: 'go to gym',
        color: '2',
        complete: false
    },
    {
        id: 103,
        title: 'learning TypeScript',
        color: '3',
        complete: false
    },
    {
        id: 104,
        title: 'learning TypeScript in React',
        color: '3',
        complete: false
    },
    {
        id: 105,
        title: 'learning MUI',
        color: '3',
        complete: false
    },
]

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
        props,
        ref,
    ) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

export default function UnscheduledTodo(props: Props) {
    const { window, toggleUnscheduledTodo, setToggleUnscheduledTodo, setDraggedEvent } = props;
    const [unscheduledTodoList, setUnscheduledTodoList] = React.useState(unscheduledList);
    const [checked, setChecked] = React.useState([1]);
    const [openSuccessDelete, setOpenSuccessDelete] = React.useState(false);
    const container = window !== undefined ? () => window().document.body : undefined;

    //mark an unscheduled todo as completed
    const handleToggleMarkAsCompleted = (todoId: number) => () => {
        const currentIndex = checked.indexOf(todoId);
        const newChecked = [...checked];
    
        if (currentIndex === -1) {
          newChecked.push(todoId);
        } else {
          newChecked.splice(currentIndex, 1);
        }
    
        setChecked(newChecked);
    };

    //delete an unscheduled todo
    const handleDeleteTodoClick = () => {
        setOpenSuccessDelete(true);
      };
    
    const handleSuccessDeleteInfoClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
        return;
    }

    setOpenSuccessDelete(false);
    };

    //drag and drop an unscheduled todo
    const handleDragStart = React.useCallback((todo: any) => {
        setDraggedEvent(todo);
    }, [])

    const handleDragOver = (id: number) => {
        setToggleUnscheduledTodo(false);
        setUnscheduledTodoList(pre => pre.filter(todo => todo.id !== id));
    }

    return (
        <div>
        <CssBaseline />
        <Global
            styles={{
            '.MuiDrawer-root > .MuiPaper-root': {
                height: `calc(50% - ${drawerBleeding}px)`,
                overflow: 'visible'
            },
            }}
        />
        <SwipeableDrawer
            container={container}
            anchor="bottom"
            open={toggleUnscheduledTodo}
            onClose={() => setToggleUnscheduledTodo(false)}
            onOpen={() => setToggleUnscheduledTodo(true)}
            swipeAreaWidth={drawerBleeding}
            disableSwipeToOpen={true}
            ModalProps={{
            keepMounted: true,
            }}
        >
            <Box
            sx={{
                position: 'absolute',
                top: -drawerBleeding,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                visibility: 'visible',
                right: 0,
                left: 0,
                bgcolor: toggleUnscheduledTodo ? '#fff': 'primary.main'
            }}
            >
            <Puller sx={{backgroundColor: toggleUnscheduledTodo? grey[300] : '#fff'}}/>
            <Typography sx={{ p: 2, color: toggleUnscheduledTodo ? 'text.secondary' : '#fff' }}>{unscheduledTodoList.length} Unscheduled todos</Typography>
            </Box>
            <Box
            sx={{
                px: 2,
                pb: 2,
                height: '100%',
                overflow: 'auto',
            }}
            >
               <List sx={{ width: '100%', maxWidth: 800, bgcolor: 'background.paper' }}>
                {unscheduledTodoList.map((todo) => {
                    return (
                        <ListItem
                            key={todo.id}
                            secondaryAction={
                                <IconButton edge="end" aria-label="delete an unscheduled todo">
                                    <MdOutlineDelete onClick={handleDeleteTodoClick}/>
                                </IconButton>
                            }
                            disablePadding
                            >
                            <ListItemButton role={undefined} onClick={handleToggleMarkAsCompleted(todo.id)} dense>
                            <ListItemIcon>
                                <Checkbox
                                edge="start"
                                checked={checked.indexOf(todo.id) !== -1}
                                tabIndex={-1}
                                disableRipple
                                />
                            </ListItemIcon>
                            <ListItemText 
                                draggable={checked.indexOf(todo.id) === -1 ? true : false}
                                onDragStart={() => {
                                        handleDragStart(todo);
                                    }
                                }
                                onDragOver={() => {
                                        handleDragOver(todo.id);
                                    }
                                }

                                primary={todo.title} 
                                sx={{
                                    textDecorationLine: checked.indexOf(todo.id) === -1 ? 'none' : 'line-through',
                                    borderLeft: 5,
                                    borderRadius: '2px',
                                    borderColor: `${colorMap[todo.color]}`,
                                    pl: 2
                                }}
                            />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
                </List> 
                <Snackbar open={openSuccessDelete} autoHideDuration={2000} onClose={handleSuccessDeleteInfoClose}>
                    <Alert onClose={handleSuccessDeleteInfoClose} severity="success" sx={{ width: '100%' }}>
                    Successfully deleted this todo!
                    </Alert>
                </Snackbar>
            </Box>
        </SwipeableDrawer>
        </div>
    );
}
