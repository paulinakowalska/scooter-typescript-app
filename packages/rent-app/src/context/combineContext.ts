import { AppContextActions, AppContextState } from './types';
import { eventsReducer } from './events';
import { scootersReducer } from './scooters';
import { usersReducer } from './users';

export const combineContext = (state: AppContextState, action: AppContextActions): AppContextState => {
    return {
        events: eventsReducer(state.events, action),
        scooters: scootersReducer(state.scooters, action),
        users: usersReducer(state.users, action),
    };
};
