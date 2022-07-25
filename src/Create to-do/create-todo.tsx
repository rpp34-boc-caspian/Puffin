
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
import { FilledInput, FormControl, InputAdornment, InputLabel, Typography, Button, OutlinedInput, MenuItem, ListItemText, Checkbox } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import PeopleIcon from '@mui/icons-material/People';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const Container = styled('div')`
    display: flex;
    width: 70%;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
    margin: 20px;
    padding: 100px;
    // align-items: center;
`;

const StyledPeopleIcon = styled(PeopleIcon)`
    margin: 0 10px;
`

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

export function CreateTodo() {

    const label = { inputProps: { 'aria-label': 'Switch demo' } };

    const [value, setValue] = React.useState<Date | null>(
        new Date('2014-08-18T21:11:54'),
    );

    const handleChange = (newValue: Date | null) => {
        setValue(newValue);
    };

    const [personName, setPersonName] = React.useState<string[]>([]);

    const handleChangeCategories = (event: SelectChangeEvent<typeof personName>) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <Container>
            <Stack spacing={5}>
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

                    />
                </Box>
                <Grid container item xs={12}>
                    <TextField
                        id="outlined-multiline-static"
                        label="DESCRIPTION"
                        fullWidth
                        multiline
                        rows={6}
                        placeholder="Enter Description"
                    />
                </Grid>
                <div>
                    Add to calendar <Switch {...label} defaultChecked />
                </div>
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
                                    value={value}
                                    onChange={handleChange}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Grid>
                            <Grid item xs={5}>
                                <MobileTimePicker
                                    label="Time"
                                    value={value}
                                    onChange={handleChange}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                                {/* <TimePicker
                                    label="Time"
                                    value={value}
                                    onChange={handleChange}
                                    renderInput={(params) => <TextField {...params} />}
                                /> */}
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} spacing={2}>
                            <Grid item xs={2}>
                                End
                            </Grid>
                            <Grid item xs={5}>
                                <DesktopDatePicker
                                    label="Date"
                                    inputFormat="MM/dd/yyyy"
                                    value={value}
                                    onChange={handleChange}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Grid>
                            <Grid item xs={5}>
                                <TimePicker
                                    label="Time"
                                    value={value}
                                    onChange={handleChange}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </LocalizationProvider>
                <div>
                    <Checkbox {...label} /> All day
                </div>
                <div>
                    <StyledPeopleIcon />Share with friends<Switch {...label} defaultChecked />
                </div>
                <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="demo-multiple-checkbox-label">CATEGORIES</InputLabel>
                    <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={personName}
                        onChange={handleChangeCategories}
                        input={<OutlinedInput label="Tag" />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                    >
                        {names.map((name) => (
                            <MenuItem key={name} value={name}>
                                <Checkbox checked={personName.indexOf(name) > -1} />
                                <ListItemText primary={name} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Grid container>
                    <Grid xs={9}></Grid>
                    <Grid xs={3}>
                        <Button fullWidth variant="contained" size="large">Add</Button>\
                    </Grid>

                </Grid>
                {/* <div style={{ display: 'flex', justifyContent: 'right' }}> */}
                {/* </div> */}
            </Stack>
        </Container>
    )

}


