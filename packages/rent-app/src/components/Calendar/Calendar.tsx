import React, { FunctionComponent, useEffect, useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styled from 'styled-components';
import EventModal from '../EventModal/EventModal';
import EditEventModal from '../EditEventModal/EditEventModal';
import { addEvent, deleteEvent, getEvents } from '../../api';
import { useStore } from '../../context/ContextProvider';
import { EventsActions, EventsMap } from '../../context';

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

const correctScooterList = [2];

const formatEvents = (events: EventsMap): { id: number; title: string; start: Date; end: Date }[] => {
    return Object.values(events).map(({ id, name, startDate, endDate }) => {
        return {
            id,
            title: name,
            start: new Date(startDate),
            end: new Date(endDate),
        };
    });
};

/** Calendar custom component wrapper */

const Calendar: FunctionComponent<CalendarProps> = ({
    defaultDate = moment().toDate(),
    localizer = momentLocalizer(moment),
}) => {
    const [openEventModal, setOpenEventModal] = useState(false);
    const [openEditEventModal, setOpenEditEventModal] = useState(false);
    const [selectedScooter, setSelectedScooter] = useState(correctScooterList[0]);
    const [selectedEvent, setSelectedEvent] = useState({});
    const [startDate, setStartDate] = useState(defaultDate);
    const [endDate, setEndDate] = useState(defaultDate);
    const { state, dispatch } = useStore();

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            try {
                dispatch({ type: EventsActions.SET_LOADING, payload: true });
                const events = await getEvents();
                dispatch({ type: EventsActions.SET_EVENTS, payload: { events } }); // dispatch(eventsActions.setEvents({ events }));
            } catch (err) {
                dispatch({ type: EventsActions.SET_ERROR_MESSAGE, payload: err.message });
            } finally {
                dispatch({ type: EventsActions.SET_LOADING, payload: false });
            }
        };
        fetchData();
    }, []); // [] if effect doesn't need props or state

    const handleSelectSlot = (slotInfo: { start: Date }) => {
        const { start } = slotInfo;

        setStartDate(moment(start).toDate());
        setEndDate(moment(start).toDate());
        setOpenEventModal(true);
    };

    const handleSelectEvent = (event: { start: Date; end: Date }) => {
        setStartDate(event.start);
        setEndDate(event.end);

        setOpenEditEventModal(true);
        setSelectedEvent(event);
    };

    const handleClose = () => {
        setOpenEventModal(false);
    };

    const handleCloseEvent = () => {
        setOpenEditEventModal(false);
    };

    const handleDeleteEvent = (eventId: number) => {
        const deleteData = async (): Promise<void> => {
            try {
                dispatch({ type: EventsActions.DELETE_EVENT, payload: eventId });
                await deleteEvent(eventId);
            } catch (err) {
                dispatch({ type: EventsActions.SET_ERROR_MESSAGE, payload: err.message });
            }
        };
        deleteData();
    };

    const handleChangeStartDate = (date: Date) => {
        setStartDate(moment(date).toDate());
        if (date > endDate) {
            setEndDate(moment(date).toDate());
        }
    };
    const handleChangeEndDate = (date: Date) => {
        setEndDate(moment(date).toDate());
    };

    const handleAddEvent = () => {
        const addData = async () => {
            try {
                const event = {
                    name: `${selectedScooter} - User Name`,
                    startDate,
                    endDate,
                    scooterId: selectedScooter,
                    userId: 15,
                };

                await addEvent(event);

                const events = await getEvents();
                dispatch({ type: EventsActions.SET_EVENTS, payload: { events } });
            } catch (err) {
                dispatch({ type: EventsActions.SET_ERROR_MESSAGE, payload: err.message });
            }
        };
        addData();
    };

    const handleChangeSelection = (event: React.ChangeEvent<{ name?: string; value: number }>) => {
        const { value } = event.target;

        setSelectedScooter(value);
    };

    if (state.events.isLoading) {
        return <>loading</>;
    }

    if (state.events.errorMessage) {
        return <>error</>;
    }

    const formattedEvents = formatEvents(state.events.data);

    return (
        <CalendarContainer>
            <BigCalendar
                events={formattedEvents}
                startAccessor="start"
                endAccessor="end"
                defaultDate={defaultDate}
                localizer={localizer}
                selectable
                onSelectSlot={handleSelectSlot}
                onSelectEvent={handleSelectEvent}
                views={['month', 'week', 'day']}
            />
            <EventModal
                open={openEventModal}
                onClose={handleClose}
                startDate={new Date(startDate)}
                endDate={new Date(endDate)}
                onChangeStartDate={handleChangeStartDate}
                onChangeEndDate={handleChangeEndDate}
                selectedScooter={selectedScooter}
                onChangeSelection={handleChangeSelection}
                scooterList={correctScooterList}
                onAddEvent={handleAddEvent}
            />
            <EditEventModal
                open={openEditEventModal}
                onClose={handleCloseEvent}
                startDate={new Date(startDate)}
                endDate={new Date(endDate)}
                onChangeStartDate={handleChangeStartDate}
                onChangeEndDate={handleChangeEndDate}
                selectedScooter={selectedScooter}
                selectedEvent={selectedEvent}
                onChangeSelection={handleChangeSelection}
                scooterList={correctScooterList}
                onDeleteEvent={handleDeleteEvent}
            />
        </CalendarContainer>
    );
};

export { Calendar };
