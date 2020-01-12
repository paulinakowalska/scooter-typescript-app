import React from 'react';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

interface DatePickerProps {
    date?: Date | number;
    handleDateChange: (date: Date, value?: string) => void;
    dateFormat?: string;
}

const DatePicker = ({
    date = new Date('2019-02-19'),
    handleDateChange,
    dateFormat = 'dd/MM/yyyy',
}: DatePickerProps) => (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Date picker dialog"
            format={dateFormat}
            value={date}
            onChange={handleDateChange}
            KeyboardButtonProps={{
                'aria-label': 'change date',
            }}
        />
    </MuiPickersUtilsProvider>
);

export default DatePicker;
