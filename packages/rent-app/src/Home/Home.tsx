import React from 'react';
import DatePicker from '../DatePicker/DatePicker';
import { Calendar } from '../Calendar/Calendar';

const Home: React.FunctionComponent = () => (
    <div>
        <DatePicker handleDateChange={console.log} />
        <Calendar />
    </div>
);

export default Home;
