import { ScootersActions, ScootersState } from './types';
import { ActionUnion } from '../utils/makeAction';
import { scootersActions } from './actions';
import { Reducer } from 'react';

export const scootersInitialState: ScootersState = {
    isLoading: false,
    errorMessage: '',
    data: {},
};

export type ScootersAction = ActionUnion<typeof scootersActions>;

export const scootersReducer: Reducer<ScootersState, ScootersAction> = (state = scootersInitialState, action) => {
    switch (action.type) {
        case ScootersActions.SET_LOADING:
            return { ...state, isLoading: action.payload };
        case ScootersActions.SET_SCOOTERS:
            return { ...state, data: action.payload.scooters };
        case ScootersActions.SET_ERROR_MESSAGE:
            return { ...state, errorMessage: action.payload };
        default:
            return state;
    }
};
