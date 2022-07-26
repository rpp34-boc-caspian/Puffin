import React from 'react';
import {TextField} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import {getDate} from './utils/helper';

interface Props {
    date: string;
    setDate: React.Dispatch<React.SetStateAction<string>>;
    handleCalClose: () => void;
}


const MonthlyCalendar: React.FC<Props> = ({date, setDate, handleCalClose}) => {
    return(
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <StaticDatePicker
                displayStaticWrapperAs="desktop"
                openTo="day"
                value={date}
                onChange={(newDate: Date | null) => {
                var date = getDate(newDate);
                if (date) setDate(date);
                handleCalClose();
                }}
                renderInput={(params) => <TextField {...params} />}

            />
        </LocalizationProvider>
    )
}

export default MonthlyCalendar;