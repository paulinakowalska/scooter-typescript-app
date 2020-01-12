export interface UsersState {
    isLoading: boolean;
    errorMessage: string;
    data: UsersMap;
}

export type UsersMap = { [key: string]: User };

export interface User {
    id: number;
    name: string;
    firstName: string;
    lastName: string;
    mail: string;
    phoneNumber: string;
    role: string;
}

export interface SetUsersData {
    users: UsersMap;
}

export enum UsersActions {
    SET_USERS = 'users/set_users',
    SET_LOADING = 'users/set_loading',
    SET_ERROR_MESSAGE = 'users/set_error_message',
}
