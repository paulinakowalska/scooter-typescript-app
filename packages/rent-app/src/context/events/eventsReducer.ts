import { EventsActions, EventsState } from './types';
import { ActionUnion } from '../utils/makeAction';
import { eventsActions } from './actions';
import { Reducer } from 'react';

export const eventsInitialState: EventsState = {
    isLoading: false,
    errorMessage: '',
    data: {},
};

export type EventAction = ActionUnion<typeof eventsActions>;

export const eventsReducer: Reducer<EventsState, EventAction> = (state = eventsInitialState, action) => {
    switch (action.type) {
        case EventsActions.SET_LOADING:
            return { ...state, isLoading: action.payload };
        case EventsActions.SET_EVENTS:
            return { ...state, data: action.payload.events };
        case EventsActions.SET_ERROR_MESSAGE:
            return { ...state, errorMessage: action.payload };
        case EventsActions.UPDATE_EVENT:
            return { ...state, data: { ...state.data, [action.payload.id]: action.payload } };
        case EventsActions.DELETE_EVENT: {
            const eventsList = Object.values({ ...state.data });
            const filteredEventList = eventsList.filter(event => event.id !== action.payload);

            const eventsMap = filteredEventList.reduce((map, event) => {
                map[event.id] = event;
                return map;
            }, {});

            return { ...state, data: eventsMap };
        }
        default:
            return state;
    }
};
