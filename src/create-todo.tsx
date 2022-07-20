
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
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { FilledInput, FormControl, InputAdornment, InputLabel, Typography } from '@mui/material';
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

export function Todo() {

    const label = { inputProps: { 'aria-label': 'Switch demo' } };

    const [value, setValue] = React.useState<Date | null>(
        new Date('2014-08-18T21:11:54'),
    );

    const handleChange = (newValue: Date | null) => {
        setValue(newValue);
    };

    return (
        <Container>
            <Stack spacing={5}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="h4" component="h2" >
                        Add a new to-do
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

                    />
                </Box>
                <Grid container item xs={12}>
                    <TextField
                        id="outlined-multiline-static"
                        // label="Description"
                        fullWidth
                        multiline
                        rows={6}
                        defaultValue="Enter Description"
                    />
                </Grid>
                <div>
                    Add to calendar <Switch {...label} defaultChecked />
                </div>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Grid container spacing={3}>
                        <Grid container item xs={12}>
                            <Grid item xs={4}>
                                Start
                            </Grid>
                            <Grid item xs={4}>
                                <MobileDatePicker
                                    label="Date"
                                    inputFormat="MM/dd/yyyy"
                                    value={value}
                                    onChange={handleChange}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TimePicker
                                    label="Time"
                                    value={value}
                                    onChange={handleChange}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Grid>
                        </Grid>
                        <Grid container item xs={12}>
                            <Grid item xs={4}>
                                End
                            </Grid>
                            <Grid item xs={4}>
                                <MobileDatePicker
                                    label="Date"
                                    inputFormat="MM/dd/yyyy"
                                    value={value}
                                    onChange={handleChange}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Grid>
                            <Grid item xs={4}>
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
                    Share with friends <Switch {...label} defaultChecked />
                </div>
            </Stack>
        </Container>
    )

}
