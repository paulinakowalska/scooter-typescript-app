import { makeAction } from '../utils/makeAction';
import { ScootersActions, SetScootersData } from './types';

export const scootersActions = {
    setLoading: (isLoading: boolean) => makeAction(ScootersActions.SET_LOADING, isLoading),
    setScooters: (scooters: SetScootersData) => makeAction(ScootersActions.SET_SCOOTERS, scooters),
    setErrorMessage: (errorMessage: string) => makeAction(ScootersActions.SET_ERROR_MESSAGE, errorMessage),
};
