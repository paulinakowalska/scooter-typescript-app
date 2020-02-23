import React, { useEffect } from 'react';
import { addScooter, deleteScooter, getScooters, updateScooter } from '../../api/';
import { ScootersActions } from '../../context';
import { useStore } from '../../context/ContextProvider';
import Table from '../../components/Table/Table';

const ScootersWrapper: React.FunctionComponent = () => {
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

    // Update scooter
    const handleUpdateScooter = scooter => {
        const { id, name, model, status } = scooter;

        const shouldUpdateScooter = id && name && model && status;

        if (shouldUpdateScooter) {
            const updateData = async () => {
                try {
                    await updateScooter(scooter);

                    const scooters = await getScooters();
                    dispatch({ type: ScootersActions.SET_SCOOTERS, payload: { scooters } });
                } catch (err) {
                    console.log(err);
                }
            };
            updateData();
        }
    };

    // Add scooter
    const handleAddScooter = ({ name, model, status }) => {
        const shouldAddScooter = name && model && status;

        if (shouldAddScooter) {
            const addData = async () => {
                try {
                    const scooter = {
                        name,
                        model,
                        status,
                    };

                    await addScooter(scooter);

                    const scooters = await getScooters();
                    dispatch({ type: ScootersActions.SET_SCOOTERS, payload: { scooters } });
                } catch (err) {
                    dispatch({ type: ScootersActions.SET_ERROR_MESSAGE, payload: err.message });
                }
            };
            addData();
        }
    };

    // Delete scooter
    const handleDeleteScooter = id => {
        const deleteData = async (): Promise<void> => {
            try {
                await deleteScooter(id);
                dispatch({ type: ScootersActions.DELETE_SCOOTER, payload: id });

                const scooters = await getScooters();
                dispatch({ type: ScootersActions.SET_SCOOTERS, payload: { scooters } });
            } catch (err) {
                dispatch({ type: ScootersActions.SET_ERROR_MESSAGE, payload: err.message });
            }
        };
        deleteData();
    };

    const scootersList = Object.values(state.scooters.data);
    return (
        <Table
            columns={[
                { title: 'Id', field: 'id' },
                { title: 'Name', field: 'name' },
                { title: 'Model', field: 'model' },
                { title: 'Status', field: 'status' },
            ]}
            data={scootersList}
            handleAddScooter={handleAddScooter}
            handleUpdateScooter={handleUpdateScooter}
            handleDeleteScooter={handleDeleteScooter}
        />
    );
};

export default ScootersWrapper;
