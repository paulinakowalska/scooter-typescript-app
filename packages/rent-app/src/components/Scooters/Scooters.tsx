import React, { useEffect } from 'react';
import styled from 'styled-components';

import { getScooters } from '../../api/';
import { ScootersActions } from '../../context';
import { useStore } from '../../context/ContextProvider';

const ScootersList = styled.div`
    justify-content: space-around;
`;

const Scooter = styled.div`
    display: flex;
    justify-content: space-around;
    padding-bottom: ${props => props.theme.space.medium};
`;

const Scooters: React.FunctionComponent = () => {
    const { state, dispatch } = useStore();

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            try {
                dispatch({ type: ScootersActions.SET_LOADING, payload: true });
                const scooters = await getScooters();
                dispatch({ type: ScootersActions.SET_SCOOTERS, payload: { scooters } });
            } catch (err) {
                dispatch({ type: ScootersActions.SET_ERROR_MESSAGE, payload: err.message });
            } finally {
                dispatch({ type: ScootersActions.SET_LOADING, payload: false });
            }
        };
        fetchData();
    }, []);

    const scootersList = Object.values(state.scooters.data);
    return (
        <ScootersList>
            {scootersList.map(scooter => (
                <Scooter key={scooter.id}>
                    <div>{scooter.name}</div>
                    <div>{scooter.model}</div>
                    <div>{scooter.id}</div>
                </Scooter>
            ))}
        </ScootersList>
    );
};

export default Scooters;
