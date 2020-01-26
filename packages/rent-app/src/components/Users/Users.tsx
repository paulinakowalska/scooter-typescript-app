import React, { useEffect } from 'react';
import styled from 'styled-components';

import { getUsers } from '../../api';
import { useStore } from '../../context/ContextProvider';
import { UsersActions } from '../../context/users';

const UsersList = styled.div`
    justify-content: space-around;
`;

const User = styled.div`
    display: flex;
    justify-content: space-around;
    padding-bottom: ${props => props.theme.space.medium};
`;

const Users: React.FunctionComponent = () => {
    const { state, dispatch } = useStore();

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            try {
                dispatch({ type: UsersActions.SET_LOADING, payload: true });
                const users = await getUsers();
                dispatch({ type: UsersActions.SET_USERS, payload: { users } });
            } catch (err) {
                dispatch({ type: UsersActions.SET_ERROR_MESSAGE, payload: err.message });
            } finally {
                dispatch({ type: UsersActions.SET_LOADING, payload: false });
            }
        };
        fetchData();
    }, []);

    const usersList = Object.values(state.users.data);

    return (
        <UsersList>
            {usersList.map(user => (
                <User key={user.id}>
                    <div>{user.id}</div>
                    <div>{user.name}</div>
                    <div>{user.mail}</div>
                </User>
            ))}
        </UsersList>
    );
};

export default Users;
