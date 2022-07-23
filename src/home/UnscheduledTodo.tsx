import * as React from 'react';
import { Global } from '@emotion/react';
import { styled, useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey, red} from '@mui/material/colors';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

const drawerBleeding = 56;

interface Props {
  window?: () => Window;
  toggleUnscheduledTodo: boolean;
  setToggleUnscheduledTodo: React.Dispatch<React.SetStateAction<boolean>>
}

const Puller = styled(Box)(() => ({
  width: 30,
  height: 6,
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));

export default function UnscheduledTodo(props: Props) {
    const { window, toggleUnscheduledTodo, setToggleUnscheduledTodo } = props;

  // This is used only for the example
    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div>
        <CssBaseline />
        <Global
            styles={{
            '.MuiDrawer-root > .MuiPaper-root': {
                height: `calc(50% - ${drawerBleeding}px)`,
                overflow: 'visible',
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
            <Typography sx={{ p: 2, color: toggleUnscheduledTodo ? 'text.secondary' : '#fff' }}>51 results</Typography>
            </Box>
            <Box
            sx={{
                px: 2,
                pb: 2,
                height: '100%',
                overflow: 'auto',
            }}
            >
            <Skeleton variant="rectangular" height="100%" />
            </Box>
        </SwipeableDrawer>
        </div>
    );
}
