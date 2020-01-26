import { Dispatch } from 'react';
import { EventAction, EventsState } from './events';
import { ScootersAction, ScootersState } from './scooters';
import { UsersAction, UsersState } from './users';

export interface AppContextState {
    events: EventsState;
    scooters: ScootersState;
    users: UsersState;
}

export type AppContextActions = EventAction | ScootersAction | UsersAction;

export type AppContextDispatch = Dispatch<AppContextActions>;
