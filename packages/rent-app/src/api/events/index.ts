import axios, { AxiosResponse } from 'axios';
import { api } from '../../config';
import { Event, EventsMap } from '../../context';

export const getEvents = async (): Promise<EventsMap> => {
    const eventsList = await axios.get<{}, AxiosResponse<Event[]>>(`${api}/events`);
    return eventsList.data.reduce((map, event) => {
        map[event.id] = event;
        return map;
    }, {});
};

export const addEvent = async event => {
    try {
        await axios.post(`${api}/events`, event);
    } catch (err) {
        console.error(err);
    }
};

export const deleteEvent = async eventId => {
    try {
        await axios.delete(`${api}/events/${eventId}/`);
    } catch (err) {
        console.error(err);
    }
};

export const changeEvent = async event => {
    try {
        await axios.put(`${api}/events/`, event);
    } catch (err) {
        console.error(err);
    }
};
