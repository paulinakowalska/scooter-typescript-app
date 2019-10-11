import React from 'react';
import DatePicker from '../DatePicker/DatePicker';
import BigCalendar from '../Calendar/Calendar';

const Home: React.FunctionComponent = () => (
    <div>
        <DatePicker handleDateChange={console.log} />
        <BigCalendar />
    </div>
);

export default Home;
