import axios, { AxiosResponse } from 'axios';
import { api } from '../../config';
import { Scooter, ScootersMap } from '../../context/scooters';

export const getScooters = async (): Promise<ScootersMap> => {
    const scootersList = await axios.get<{}, AxiosResponse<Scooter[]>>(`${api}/scooter`);
    return scootersList.data.reduce((map, scooter) => {
        map[scooter.id] = scooter;
        return map;
    }, {});
};

export const addScooter = async scooter => {
    try {
        await axios.post(`${api}/scooter`, scooter);
    } catch (err) {
        console.error(err);
    }
};

export const deleteScooter = async scooterId => {
    try {
        await axios.delete(`${api}/scooter/${scooterId}/`);
    } catch (err) {
        console.error(err);
    }
};

// add update
