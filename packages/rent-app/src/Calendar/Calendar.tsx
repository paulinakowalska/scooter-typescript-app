import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import '!style-loader!css-loader!react-big-calendar/lib/css/react-big-calendar.css';
import styled from 'styled-components';

const CalendarContainer = styled.div`
    height: 500px;
    margin: 50px;
`;

interface CalendarProps {
    events?: Array<object> | Array<void>;
    defaultDate?: Date | number;
    localizer?: void;
}

const eventsList = [
    {
        id: 0,
        title: 'All Day Event very long title',
        allDay: true,
        start: new Date(2019, 9, 1),
        end: new Date(2019, 9, 2),
    },
    {
        id: 1,
        title: 'Long Event',
        start: new Date(2019, 9, 7),
        end: new Date(2019, 9, 10),
    },
    {
        id: 2,
        title: 'Right now Time Event',
        start: new Date(),
        end: new Date(),
    },
];

const BigCalendar = ({
    events = eventsList,
    defaultDate = moment().toDate(),
    localizer = momentLocalizer(moment),
}: CalendarProps) => {
    return (
        <CalendarContainer>
            <Calendar
                events={events}
                startAccessor="start"
                endAccessor="end"
                defaultDate={defaultDate}
                localizer={localizer}
            />
        </CalendarContainer>
    );
};

export default BigCalendar;
