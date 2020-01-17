import React, { FunctionComponent } from 'react';
import { Calendar as BigCalendar } from 'react-big-calendar';
import { Moment } from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styled from 'styled-components';
import EventModal from '../EventModal/EventModal';
import EditEventModal from '../EditEventModal/EditEventModal';
import CircularProgress from '@material-ui/core/CircularProgress';

const CalendarContainer = styled.div`
    height: 500px;
    margin: 50px;
`;

const Spinner = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ErrorMessage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${props => props.theme.fonts.size.large};
    color: ${props => props.theme.colors.darkBlue};
`;

interface CalendarProps {
    /** default new Date.now() */
    defaultDate?: Moment;
    localizer?: object;
    isLoading: boolean;
    isError: string;
    openEventModal: boolean;
    handleSelectSlot: (slotInfo: { start: Date }) => void;
    handleSelectEvent: (event: { start: Date; end: Date }) => void;
    handleClose: () => void;
    handleCloseEvent: () => void;
    handleDeleteEvent: (eventId: number) => void;
    handleChangeStartDate: (date: Date) => void;
    handleChangeEndDate: (date: Date) => void;
    handleAddEvent: () => void;
    scootersList: Array<number>;
    eventsList: Array<object>;
    openEditEventModal: boolean;
    selectedEvent: object;
    selectedScooter: number;
    startDate: Moment;
    endDate: Moment;
    handleChangeSelection: (event: React.ChangeEvent<{ name?: string; value: number }>) => void;
}

/** Calendar custom component wrapper */

const Calendar: FunctionComponent<CalendarProps> = ({
    localizer,
    defaultDate,
    isLoading,
    isError,
    openEventModal,
    handleSelectSlot,
    handleSelectEvent,
    handleClose,
    handleCloseEvent,
    handleDeleteEvent,
    handleChangeStartDate,
    handleChangeEndDate,
    handleAddEvent,
    scootersList,
    eventsList,
    openEditEventModal,
    selectedEvent,
    selectedScooter,
    startDate,
    endDate,
    handleChangeSelection,
}) => {
    if (isError) {
        return <ErrorMessage>ERROR</ErrorMessage>; // todo: fix text
    }
    // const formattedEvents = formatEvents(state.events.data);
    // const availableScooters = formatScooters(state.events.data, startDate, endDate);

    return isLoading ? (
        <Spinner>
            <CircularProgress />
        </Spinner>
    ) : (
        <CalendarContainer>
            <BigCalendar
                events={eventsList}
                startAccessor="start"
                endAccessor="end"
                defaultDate={defaultDate.toDate()}
                localizer={localizer}
                selectable
                onSelectSlot={handleSelectSlot}
                onSelectEvent={handleSelectEvent}
                views={['month', 'week', 'day']}
            />
            <EventModal
                open={openEventModal}
                onClose={handleClose}
                startDate={startDate}
                endDate={endDate}
                onChangeStartDate={handleChangeStartDate}
                onChangeEndDate={handleChangeEndDate}
                selectedScooter={selectedScooter}
                onChangeSelection={handleChangeSelection}
                scooterList={scootersList}
                onAddEvent={handleAddEvent}
            />
            <EditEventModal
                open={openEditEventModal}
                onClose={handleCloseEvent}
                startDate={startDate}
                endDate={endDate}
                onChangeStartDate={handleChangeStartDate}
                onChangeEndDate={handleChangeEndDate}
                selectedScooter={selectedScooter}
                selectedEvent={selectedEvent}
                onChangeSelection={handleChangeSelection}
                scooterList={scootersList}
                onDeleteEvent={handleDeleteEvent}
            />
        </CalendarContainer>
    );
};

export { Calendar };
