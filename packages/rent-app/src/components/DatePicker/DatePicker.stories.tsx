import React from 'react';
import { storiesOf } from '@storybook/react';
import { date, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import DatePicker from './DatePicker';

storiesOf('DatePicker', module).add('date picker', () => (
    <DatePicker
        date={date('date I', new Date('2018-02-20'))}
        dateFormat={text('date format', 'dd-MM-yyyy')}
        handleDateChange={action('date-change')}
    />
));
