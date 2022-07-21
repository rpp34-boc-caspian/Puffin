import React from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

const MonthlyCalendar = ({date, setDate, setShowCal}) => {
    return(
        <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <StaticDatePicker
                    displayStaticWrapperAs="desktop"
                    openTo="year"
                    value={date}
                    onChange={(newDate) => {
                    var date = newDate.toLocaleDateString();
                    setDate(date);
                    setShowCal(false);
                    }}
                />
            </LocalizationProvider>
        </div>
    )
}

export default MonthlyCalendar;