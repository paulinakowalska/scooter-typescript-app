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

export const getScootersBy = async (params: object): Promise<ScootersMap> => {
    const urlParams = Object.keys(params)
        .filter(p => params[p])
        .map(key => `${key}=${params[key]}`)
        .join('&');

    const scootersList = await axios.get<{}, AxiosResponse<Scooter[]>>(`${api}/scooter?${urlParams}`);

    return scootersList.data.reduce((map, scooter) => {
        map[scooter.id] = scooter;
        return map;
    }, {});
};

export const getAvailableScooters = async (params: { startDate; endDate }): Promise<ScootersMap> => {
    const urlParams = `startDate=${params.startDate}&formattedEndDate=${params.endDate}`;

    const scootersList = await axios.get<{}, AxiosResponse<Scooter[]>>(`${api}/scooter/available?${urlParams}`);
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

export const updateScooter = async scooter => {
    try {
        await axios.put(`${api}/scooter/`, scooter);
    } catch (err) {
        console.error(err);
    }
};
