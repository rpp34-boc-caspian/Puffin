
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

import { Category, CreateCategoryModal } from './create-category-modal';

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

interface TodoProps {
    id?: number;
    initTitle: string;
    initDescription: string;
    initStart: Date | null;
    initEnd: Date | null;
    initAllDay: boolean;
    initSelectedCategory: string;
    calendarId: number;
    mode: 'Add' | 'Edit';
}

export function ToDo({
    id,
    calendarId = 1,
    initTitle,
    initDescription,
    initStart,
    initEnd,
    initAllDay,
    initSelectedCategory,
    mode,
}: TodoProps) {
    const [categories, setCategories] = React.useState([]);
    const [title, setTitle] = React.useState(initTitle);
    const [description, setDescription] = React.useState(initDescription);
    const [start, setStart] = React.useState(initStart);
    const [end, setEnd] = React.useState(initEnd);
    const [allDay, setAllday] = React.useState(initAllDay);
    const [hideDates, setHideDates] = React.useState(mode === "Edit");
    const [selectedCategory, setSelectedCategory] = React.useState(initSelectedCategory);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [friend, setFriend] = React.useState('');

    React.useEffect(() => {
        fetch(`/api/getcategories?calendarId=${calendarId}`, {
            method: "GET",
        })
            .then((resp) => resp.json())
            .then(({ categories }) => setCategories(categories))
            .catch((err) => console.log(err));
    }, []);

    const handleButtonClick = React.useCallback(async () => {
        const url = mode === "Add" ? "/api/createtodo" : "/api/updatetodo";

        const body = {
            title,
            description,
            start,
            end,
            allDay,
            selectedCategory
        };

        if (mode === "Edit") {
            // @ts-ignore
            body.id = id;
        }

        const resp = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        })

        try {
            const data = await resp.json();
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    }, [description, title, start, end, allDay])

    const handleCategoryChange = (event: SelectChangeEvent<typeof selectedCategory>) => {
        const {
            target: { value },
        } = event;

        if (value === ADD_CATEGORY) {
            setIsModalOpen(true);
        } else {
            setSelectedCategory(
                // On autofill we get a stringified value.
                value as string,
            );
        }
    };

    const handleSaveCategory = async ({ color, name }: Category) => {
        const resp = await fetch("/api/createcategory", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                color,
                calendarId,
            })
        })

        try {
            const { categories } = await resp.json();
            setCategories(categories);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Container>
            {/* <Stack spacing={5}> */}
            <div style={{ display: 'flex', justifyContent: 'left' }}>
                <Typography variant="h4" component="h2" >
                    {mode} {mode === "Add" && "a new"} to-do
                </Typography>
            </div>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <TextField
                    id="standard-textarea"
                    label="Title"
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
                    label="Description"
                    fullWidth
                    multiline
                    rows={6}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter Description"
                />
            </Grid>
            {mode === "Add" && <div>
                Add to calendar <Switch {...label} value={hideDates} onChange={(event) => setHideDates(event.target.checked)} />
            </div>
            }
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
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <TextField
                        id="standard-textarea"
                        label="Friends"
                        placeholder="Enter Friend's name"
                        multiline
                        variant="standard"
                        fullWidth
                        value={friend}
                        onChange={({ target: { value } }) => setFriend(value)}
                    />
                </Box>
            </div>
            <FormControl sx={{ m: 1, width: '-webkit-fill-available' }}>
                <InputLabel id="demo-multiple-checkbox-label">Categories</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    input={<OutlinedInput label="Categories" />}
                    renderValue={(selected) => selected}
                    MenuProps={MenuProps}
                >
                    {categories.map(({ category_name, color, id }) => (
                        <MenuItem key={category_name} value={category_name}>
                            <Checkbox checked={selectedCategory === category_name} />
                            <ListItemText primary={category_name} />
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
                    <Button onClick={handleButtonClick} fullWidth variant="contained" size="large">
                        {mode}
                    </Button>
                </Grid>
            </Grid>
            {/* </Stack> */}
            <CreateCategoryModal
                isOpen={isModalOpen}
                close={() => setIsModalOpen(false)}
                saveCategory={handleSaveCategory}
            />
        </Container>
    )

}


