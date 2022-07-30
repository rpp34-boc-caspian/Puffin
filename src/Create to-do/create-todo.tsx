
import React from 'react';
import { styled } from '@mui/material/styles';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import {
    FormControl,
    InputLabel,
    Typography,
    Button,
    OutlinedInput,
    MenuItem,
    ListItemText,
    Checkbox,
    Modal
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import PeopleIcon from '@mui/icons-material/People';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import theme from '../theme';

const Container = styled('div')`
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    overflow: hidden;
    margin: 20px;
`;

const StyledPeopleIcon = styled(PeopleIcon)`
    margin: 0 10px;
`;

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'Tam',
    'someone',
    'test',
];

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const ADD_CATEGORY = 'add-category';

export function CreateTodo() {
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [start, setStart] = React.useState(null);
    const [end, setEnd] = React.useState(null);
    const [allDay, setAllday] = React.useState(false);
    const [hideDates, setHideDates] = React.useState(false);
    const [categories, setCategory] = React.useState<string[]>([]);
    const [isOpenModal, setIsModalOpen] = React.useState(false);
    const [newCategory, addCategory] = React.useState('');


    const save = React.useCallback(async () => {
        const resp = await fetch("/api/createtodo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                description,
                start,
                end,
                allDay
            })
        })

        try {
            const data = await resp.json();
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    }, [description, title, start, end, allDay])

    const handleCategoryChange = (event: SelectChangeEvent<typeof categories>) => {
        const {
            target: { value },
        } = event;

        if (value[0] === ADD_CATEGORY) {
            setIsModalOpen(true);
        } else {
            setCategory(
                // On autofill we get a stringified value.
                typeof value === 'string' ? value.split(',') : value,
            );
        }
    };

    return (
        <Container>
            {/* <Stack spacing={5}> */}
            <div style={{ display: 'flex', justifyContent: 'left' }}>
                <Typography variant="h4" component="h2" >
                    Add a new to-do
                </Typography>
            </div>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <TextField
                    id="standard-textarea"
                    label="TITLE"
                    placeholder="Enter Title"
                    multiline
                    variant="standard"
                    fullWidth
                    value={title}
                    onChange={({ target: { value } }) => setTitle(value)}
                />
            </Box>
            <Grid container item xs={12}>
                <TextField
                    id="outlined-multiline-static"
                    label="DESCRIPTION"
                    fullWidth
                    multiline
                    rows={6}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter Description"
                />
            </Grid>
            <div>
                Add to calendar <Switch {...label} value={hideDates} onChange={(event) => setHideDates(event.target.checked)} />
            </div>
            {hideDates &&
                <>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Grid container spacing={3}>
                            <Grid container item xs={12} spacing={2}>
                                <Grid item xs={2}>
                                    Start
                                </Grid>
                                <Grid item xs={5}>
                                    <DesktopDatePicker
                                        label="Date"
                                        inputFormat="MM/dd/yyyy"
                                        value={start}
                                        onChange={(date) => setStart(date)}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </Grid>
                                {!allDay &&
                                    <>
                                        <Grid item xs={5}>
                                            <MobileTimePicker
                                                label="Time"
                                                value={start}
                                                onChange={(date) => setStart(date)}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </Grid>
                                    </>
                                }
                            </Grid>
                            <Grid container item xs={12} spacing={2}>
                                <Grid item xs={2}>
                                    End
                                </Grid>
                                <Grid item xs={5}>
                                    <DesktopDatePicker
                                        label="Date"
                                        inputFormat="MM/dd/yyyy"
                                        value={end}
                                        onChange={(date) => setEnd(date)}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </Grid>
                                {!allDay &&
                                    <>
                                        <Grid item xs={5}>
                                            <TimePicker
                                                label="Time"
                                                value={end}
                                                onChange={(date) => setEnd(date)}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </Grid>
                                    </>
                                }
                            </Grid>
                        </Grid>
                    </LocalizationProvider>
                    <div>
                        <Checkbox
                            {...label}
                            value={allDay}
                            onChange={(e) => setAllday(e.target.checked)}
                        /> All day
                    </div>
                </>
            }
            <div>
                <StyledPeopleIcon />Share with friends<Switch {...label} defaultChecked />
            </div>
            <FormControl sx={{ m: 1, width: '-webkit-fill-available' }}>
                <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={categories}
                    onChange={handleCategoryChange}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {names.map((name) => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={categories.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                    <MenuItem value={ADD_CATEGORY}>
                        <ListItemText primary={'Add category'} />
                    </MenuItem>
                </Select>
            </FormControl>
            <Grid container>
                <Grid item xs={9}></Grid>
                <Grid item xs={3}>
                    <Button onClick={save} fullWidth variant="contained" size="large">Add</Button>
                </Grid>
            </Grid>
            {/* </Stack> */}
            <Modal
                open={isOpenModal}
                onClose={() => setIsModalOpen(false)}
                aria-labelledby="modal-modal-title"
            >
                <Box sx={modalStyle}>
                    {/* <Typography id="modal-modal-title" variant="body1" component="h6">
                        New category
                    </Typography> */}
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <TextField
                            id="standard-textarea"
                            label="Add a Category"
                            // placeholder="Enter Category"
                            multiline
                            variant="standard"
                            fullWidth
                            value={newCategory}
                            onChange={({ target: { value } }) => addCategory(value)}
                        />
                    </Box>
                </Box>
            </Modal>
        </Container>
    )

}


