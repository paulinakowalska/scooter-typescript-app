import { UsersActions, UsersState } from './types';
import { ActionUnion } from '../utils/makeAction';
import { usersActions } from './actions';
import { Reducer } from 'react';

export const usersInitialState: UsersState = {
    isLoading: false,
    errorMessage: '',
    data: {},
};

export type UsersAction = ActionUnion<typeof usersActions>;

export const usersReducer: Reducer<UsersState, UsersAction> = (state = usersInitialState, action) => {
    switch (action.type) {
        case UsersActions.SET_LOADING:
            return { ...state, isLoading: action.payload };
        case UsersActions.SET_USERS:
            return { ...state, data: action.payload.users };
        case UsersActions.SET_ERROR_MESSAGE:
            return { ...state, errorMessage: action.payload };
        default:
            return state;
    }
};
