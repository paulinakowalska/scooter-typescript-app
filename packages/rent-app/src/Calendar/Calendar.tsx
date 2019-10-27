import React from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import '!style-loader!css-loader!react-big-calendar/lib/css/react-big-calendar.css';
import styled from 'styled-components';
import EventModal from '../EventModal/EventModal';
const CalendarContainer = styled.div`
    height: 500px;
    margin: 50px;
`;

interface CalendarProps {
    events?: Array<object> | Array<void>;
    /** default new Date.now() */
    defaultDate?: Date | number;
    localizer?: object;
}

const scooterList = ['Scooter  #1', 'Scooter  #2', 'Scooter  #3', 'Scooter  #4'];

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
/** Calendar custom component wrapper */
const Calendar = ({
    events = eventsList,
    defaultDate = moment().toDate(),
    localizer = momentLocalizer(moment),
}: CalendarProps) => {
    const [open, setOpen] = React.useState(false);
    const [startDate, setStartDate] = React.useState(defaultDate);
    const [endDate, setEndDate] = React.useState(defaultDate);
    const [selectedValue, setSelectedValue] = React.useState(scooterList[0]);

    const handleSelectSlot = (slotInfo: { start: Date }) => {
        const { start } = slotInfo;

        setStartDate(moment(start).toDate());
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangeStartDate = (date: Date) => {
        setStartDate(moment(date).toDate());
    };
    const handleChangeEndDate = (date: Date) => {
        setEndDate(moment(date).toDate());
    };

    const handleAddEvent = () => {
        eventsList.push({
            id: eventsList.length + 1,
            title: `${selectedValue} - User Name`,
            allDay: true,
            start: new Date(startDate),
            end: new Date(endDate),
        });
    };

    const handleChangeSelection = (event: React.ChangeEvent<{ name?: string; value: string }>) => {
        const { value } = event.target;

        setSelectedValue(value);
    };

    return (
        <CalendarContainer>
            <BigCalendar
                events={events}
                startAccessor="start"
                endAccessor="end"
                defaultDate={defaultDate}
                localizer={localizer}
                selectable
                onSelectSlot={handleSelectSlot}
            />
            <EventModal
                open={open}
                onClose={handleClose}
                startDate={new Date(startDate)}
                endDate={new Date(endDate)}
                onChangeStartDate={handleChangeStartDate}
                onChangeEndDate={handleChangeEndDate}
                selectedValue={selectedValue}
                onChangeSelection={handleChangeSelection}
                scooterList={scooterList}
                onAddEvent={handleAddEvent}
            />
        </CalendarContainer>
    );
};

export { Calendar };
