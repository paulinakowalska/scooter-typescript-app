import React, { createContext, useContext, useReducer } from 'react';
import { combineContext } from './combineContext';
import { AppContextDispatch, AppContextState } from './types';
import { eventsInitialState } from './events';
import { scootersInitialState } from './scooters';
import { usersInitialState } from './users';

type AppContext = {
    state: AppContextState;
    dispatch: AppContextDispatch;
};

const initialState = {
    state: {
        events: eventsInitialState,
        scooters: scootersInitialState,
        users: usersInitialState,
    },
    dispatch: () => {},
};

const StoreContext = createContext<AppContext>(initialState);

export const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(combineContext, initialState.state);

    return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>;
};

export const useStore = (): AppContext => useContext(StoreContext);
