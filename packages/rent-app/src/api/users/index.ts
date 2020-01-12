import axios, { AxiosResponse } from 'axios';
import { api } from '../../config';
import { User, UsersMap } from '../../context/users';

export const getUsers = async (): Promise<UsersMap> => {
    const usersList = await axios.get<{}, AxiosResponse<User[]>>(`${api}/users`);
    return usersList.data.reduce((map, user) => {
        map[user.id] = user;
        return map;
    }, {});
};

export const addUser = async user => {
    try {
        await axios.post(`${api}/users`, user);
    } catch (err) {
        console.error(err);
    }
};

export const deleteUser = async userId => {
    try {
        await axios.delete(`${api}/users/${userId}/`);
    } catch (err) {
        console.error(err);
    }
};

// add update
