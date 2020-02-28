import React, { FunctionComponent, useEffect, useState } from 'react';
import moment from 'moment';
import { momentLocalizer } from 'react-big-calendar';
import { useStore } from '../../context/ContextProvider';
import { EventsActions, EventsMap } from '../../context/events';
import { addEvent, deleteEvent, getEvents } from '../../api/events';
import { getAvailableScooters } from '../../api/scooters';
import { ScootersActions } from '../../context/scooters';

import Calendar from '../../components/Calendar/Calendar';

const formatEvents = (events: EventsMap): { id: number; title: string; start: Date; end: Date }[] => {
    return Object.values(events).map(({ id, name, startDate, endDate }) => {
        return {
            id,
            title: name,
            start: startDate,
            end: endDate,
        };
    });
};

const formatDate = date => {
    // 2020-02-14T23:59:59.999Z
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 10) {
        month = '0' + month;
    }
    let day = date.getDate();
    if (day < 10) {
        day = '0' + day;
    }
    let hours = date.getHours();
    if (hours < 10) {
        hours = '0' + hours;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    let seconds = date.getSeconds();
    if (seconds < 10) {
        seconds = '0' + seconds;
    }

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
};

const CalendarWrapper: FunctionComponent = () => {
    const defaultDate = moment().toDate();
    const [openEventModal, setOpenEventModal] = useState(false);
    const [openEditEventModal, setOpenEditEventModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState({});
    const [selectedScooter, setSelectedScooter] = useState();
    const [startDate, setStartDate] = useState<Date>(defaultDate);
    const [endDate, setEndDate] = useState<Date>(defaultDate);
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

        setStartDate(start);

        const currentEndDate = new Date(new Date(start).setHours(23, 59, 59, 999));
        setEndDate(currentEndDate);

        const formattedStartDate = formatDate(start);
        const formattedEndDate = formatDate(currentEndDate);

        const fetchData = async (): Promise<void> => {
            try {
                const scooters = await getAvailableScooters({
                    startDate: formattedStartDate,
                    endDate: formattedEndDate,
                });
                dispatch({ type: ScootersActions.SET_SCOOTERS, payload: { scooters } });
            } catch (err) {
                dispatch({ type: ScootersActions.SET_ERROR_MESSAGE, payload: err.message });
            }
        };
        fetchData();

        setStartDate(start);
        setEndDate(currentEndDate);
        setOpenEventModal(true);
    };

    const handleSelectEvent = (event: { start: Date; end: Date }) => {
        setStartDate(event.start);
        setEndDate(event.end);
        const fetchData = async (): Promise<void> => {
            try {
                const scooters = await getAvailableScooters({
                    startDate: event.start,
                    endDate: event.end,
                });
                dispatch({ type: ScootersActions.SET_SCOOTERS, payload: { scooters } });
            } catch (err) {
                dispatch({ type: ScootersActions.SET_ERROR_MESSAGE, payload: err.message });
            }
        };
        fetchData();

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
        setStartDate(date);

        let currentEndDate = endDate;
        if (date > endDate) {
            currentEndDate = date;
            setEndDate(date);
        }
        const fetchData = async (): Promise<void> => {
            try {
                const scooters = await getAvailableScooters({
                    startDate: formatDate(date),
                    endDate: formatDate(currentEndDate),
                });
                dispatch({ type: ScootersActions.SET_SCOOTERS, payload: { scooters } });
            } catch (err) {
                dispatch({ type: ScootersActions.SET_ERROR_MESSAGE, payload: err.message });
            }
        };
        fetchData();
    };
    const handleChangeEndDate = (date: Date) => {
        const currentEndDate = new Date(new Date(date).setHours(23, 59, 59, 999));
        setEndDate(currentEndDate);
        const fetchData = async (): Promise<void> => {
            try {
                const scooters = await getAvailableScooters({
                    startDate: formatDate(startDate),
                    endDate: formatDate(currentEndDate),
                });
                dispatch({ type: ScootersActions.SET_SCOOTERS, payload: { scooters } });
            } catch (err) {
                dispatch({ type: ScootersActions.SET_ERROR_MESSAGE, payload: err.message });
            }
        };
        fetchData();
    };

    const handleAddEvent = () => {
        const addData = async () => {
            try {
                const event = {
                    name: `${selectedScooter} - User Name`,
                    startDate: startDate,
                    endDate: endDate,
                    scooterId: selectedScooter,
                    userId: 17,
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

    const availableScooters = Object.keys(state.scooters.data);
    const formattedEvents = formatEvents(state.events.data);

    const isLoading = state.events.isLoading;
    const isError = state.events.errorMessage;

    return (
        <Calendar
            localizer={momentLocalizer(moment)}
            defaultDate={defaultDate}
            isLoading={isLoading}
            isError={isError}
            openEventModal={openEventModal}
            handleSelectSlot={handleSelectSlot}
            handleSelectEvent={handleSelectEvent}
            handleClose={handleClose}
            handleCloseEvent={handleCloseEvent}
            handleDeleteEvent={handleDeleteEvent}
            handleChangeStartDate={handleChangeStartDate}
            handleChangeEndDate={handleChangeEndDate}
            handleAddEvent={handleAddEvent}
            scootersList={availableScooters}
            eventsList={formattedEvents}
            openEditEventModal={openEditEventModal}
            selectedEvent={selectedEvent}
            selectedScooter={selectedScooter}
            startDate={startDate}
            endDate={endDate}
            handleChangeSelection={handleChangeSelection}
        />
    );
};

export default CalendarWrapper;
