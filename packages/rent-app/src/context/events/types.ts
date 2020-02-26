export interface EventsState {
    isLoading: boolean;
    errorMessage: string;
    data: EventsMap;
}

export type EventsMap = { [key: string]: Event };

export interface Event {
    id?: number;
    name: string;
    startDate: Date;
    endDate: Date;
    userId: number;
    scooterId: number;
}

export interface SetEventsData {
    events: EventsMap;
}

export enum EventsActions {
    SET_EVENTS = 'events/set_events',
    SET_LOADING = 'events/set_loading',
    SET_ERROR_MESSAGE = 'events/set_error_message',
    UPDATE_EVENT = 'events/update_event',
    DELETE_EVENT = 'events/delete_event',
    ADD_EVENT = 'events/add_event',
}
