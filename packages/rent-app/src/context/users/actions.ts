import { makeAction } from '../utils/makeAction';
import { SetUsersData, UsersActions } from './types';

export const usersActions = {
    setLoading: (isLoading: boolean) => makeAction(UsersActions.SET_LOADING, isLoading),
    setUsers: (users: SetUsersData) => makeAction(UsersActions.SET_USERS, users),
    setErrorMessage: (errorMessage: string) => makeAction(UsersActions.SET_ERROR_MESSAGE, errorMessage),
};
