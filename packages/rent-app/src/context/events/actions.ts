import { makeAction } from '../utils/makeAction';
import { EventsActions, SetEventsData, Event } from './types';

// type ActionCreatorMapObject
export const eventsActions = {
    setLoading: (isLoading: boolean) => makeAction(EventsActions.SET_LOADING, isLoading),
    setEvents: (events: SetEventsData) => makeAction(EventsActions.SET_EVENTS, events),
    setErrorMessage: (errorMessage: string) => makeAction(EventsActions.SET_ERROR_MESSAGE, errorMessage),
    updateEvent: (event: Event) => makeAction(EventsActions.UPDATE_EVENT, event),
    addEvent: (event: Event) => makeAction(EventsActions.ADD_EVENT, event),
    deleteEvent: (eventId: number) => makeAction(EventsActions.DELETE_EVENT, eventId),
};
