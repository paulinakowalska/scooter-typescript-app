import { Calendar } from '../Calendar/Calendar';
import React, { FunctionComponent, useEffect, useState } from 'react';
import moment, { Moment } from 'moment';
import { momentLocalizer } from 'react-big-calendar';
import { useStore } from '../../context/ContextProvider';
import { EventsActions, EventsMap } from '../../context/events';
import { addEvent, deleteEvent, getEvents } from '../../api/events';
import { getAvailableScooters } from '../../api/scooters';
import { ScootersActions } from '../../context/scooters';

const formatEvents = (events: EventsMap): { id: number; title: string; start: Moment; end: Moment }[] => {
    return Object.values(events).map(({ id, name, startDate, endDate }) => {
        return {
            id,
            title: name,
            start: moment(startDate),
            end: moment(endDate),
        };
    });
};
// const formatScooters = (events: object, startDate: Moment, endDate: Moment) => {
//     const scooterIds = Object.values(events);
//     return scooterIds.filter((v, i) => scooterIds.indexOf(v) === i);
// };

const CalendarWrapper: FunctionComponent = () => {
    const defaultDate = moment();
    const [openEventModal, setOpenEventModal] = useState(false);
    const [openEditEventModal, setOpenEditEventModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState({});
    const [selectedScooter, setSelectedScooter] = useState();
    const [startDate, setStartDate] = useState<moment.Moment>(defaultDate);
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
        const fetchData = async (): Promise<void> => {
            try {
                // todo : fix date problems ( it should by type: 2020-01-13T00:00:00.000Z )

                const scooters = await getAvailableScooters({
                    startDate,
                    endDate,
                });
                dispatch({ type: ScootersActions.SET_SCOOTERS, payload: { scooters } });
            } catch (err) {
                dispatch({ type: ScootersActions.SET_ERROR_MESSAGE, payload: err.message });
            }
        };
        fetchData();

        setStartDate(moment(start));
        setEndDate(moment(start));
        setOpenEventModal(true);
    };

    const handleSelectEvent = (event: { start: Date; end: Date }) => {
        setStartDate(moment(event.start));
        setEndDate(moment(event.end));

        const fetchData = async (): Promise<void> => {
            try {
                // todo : fix date problems

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
        setStartDate(moment(date).subtract(date.getTimezoneOffset(), 'minutes'));

        if (date > endDate.toDate()) {
            setEndDate(moment(date).subtract(date.getTimezoneOffset(), 'minutes'));
        }
    };
    const handleChangeEndDate = (date: Date) => {
        setEndDate(moment(date).subtract(date.getTimezoneOffset(), 'minutes'));
    };

    const handleAddEvent = () => {
        const addData = async () => {
            try {
                const event = {
                    name: `${selectedScooter} - User Name`,
                    startDate: startDate.utc().valueOf(),
                    endDate: endDate.utc().valueOf(),
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

    const scootersMock = [13, 14]; // todo : remove
    // const availableScooters = formatAvailableScooters(availableScooters);
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
            scootersList={scootersMock}
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

export { CalendarWrapper };
