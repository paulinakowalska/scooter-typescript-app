import { makeAction } from '../utils/makeAction';
import { Scooter, ScootersActions, SetScootersData } from './types';

export const scootersActions = {
    setLoading: (isLoading: boolean) => makeAction(ScootersActions.SET_LOADING, isLoading),
    setScooters: (scooters: SetScootersData) => makeAction(ScootersActions.SET_SCOOTERS, scooters),
    setErrorMessage: (errorMessage: string) => makeAction(ScootersActions.SET_ERROR_MESSAGE, errorMessage),
    updateScooter: (scooter: Scooter) => makeAction(ScootersActions.UPDATE_SCOOTER, scooter),
    addScooter: (scooter: Scooter) => makeAction(ScootersActions.ADD_SCOOTER, scooter),
    deleteScooter: (scooterId: number | string) => makeAction(ScootersActions.DELETE_SCOOTER, scooterId), // empty string in initial state
};
