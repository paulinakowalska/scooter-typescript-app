export interface ScootersState {
    isLoading: boolean;
    errorMessage: string;
    data: ScootersMap;
}

export type ScootersMap = { [key: string]: Scooter };

export interface Scooter {
    id: number | string; // empty string in initial state
    name: string;
    model: string;
    status: string;
}

export interface SetScootersData {
    scooters: ScootersMap;
}

export enum ScootersActions {
    SET_SCOOTERS = 'scooters/set_scooters',
    SET_LOADING = 'scooters/set_loading',
    SET_ERROR_MESSAGE = 'scooters/set_error_message',
    UPDATE_SCOOTER = 'scooters/update_scooters',
    DELETE_SCOOTER = 'scooters/delete_scooters',
    ADD_SCOOTER = 'scooters/add_scooters',
}
