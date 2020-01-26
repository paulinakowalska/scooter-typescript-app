import React, { useEffect, useState } from 'react';
import { addScooter, deleteScooter, getScooters, getScootersBy, updateScooter } from '../../api/';
import { ScootersActions } from '../../context';
import { useStore } from '../../context/ContextProvider';
import Scooters from '../Scooters/Scooters';

const ScootersWrapper: React.FunctionComponent = () => {
    const { state, dispatch } = useStore();

    const initialScooterState = {
        id: '',
        name: '',
        model: '',
        status: 'available',
    };
    const [scooterParams, setScooterParams] = useState(initialScooterState);

    const [showInputToSelectScooters, setShowInputToSelectScooters] = useState(false);
    const [showInputToAddScooters, setShowInputToAddScooters] = useState(false);
    const [showInputToDeleteScooters, setShowInputToDeleteScooters] = useState(false);
    const [showInputToUpdateScooters, setShowInputToUpdateScooters] = useState(false);

    const handleInputChange = e => {
        const { name, value } = e.target;

        setScooterParams({ ...scooterParams, [name]: value });
    };

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

    // Fetch scooters
    const handleGetSelectedScooters = () => {
        //getAvailableScooters()

        const updateData = async () => {
            try {
                const scooters = await getScootersBy(scooterParams);
                dispatch({ type: ScootersActions.SET_SCOOTERS, payload: { scooters } });
            } catch (err) {
                console.log(err);
            }
        };
        updateData();

        // setShowInputToSelectScooters(false);
    };

    // Update scooter
    const handleUpdateScooter = () => {
        const { id, name, model, status } = scooterParams;

        const shouldUpdateScooter = id && name && model && status;

        if (shouldUpdateScooter) {
            const updateData = async () => {
                try {
                    const scooterToUpdate = {
                        id,
                        name,
                        model,
                        status,
                    };

                    await updateScooter(scooterToUpdate);
                    // dispatch({ type: ScootersActions.UPDATE_SCOOTER, payload: scooterToUpdate });

                    const scooters = await getScooters();
                    dispatch({ type: ScootersActions.SET_SCOOTERS, payload: { scooters } });
                } catch (err) {
                    console.log(err);
                }
            };
            updateData();
        }
        // setShowInputToUpdateScooters(false);
    };

    // Add scooter
    const handleAddScooter = () => {
        const { name, model, status } = scooterParams;

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

        // setShowInputToAddScooters(false);
    };

    const handleDeleteScooter = () => {
        const deleteData = async (): Promise<void> => {
            try {
                await deleteScooter(scooterParams.id);
                dispatch({ type: ScootersActions.DELETE_SCOOTER, payload: scooterParams.id });

                const scooters = await getScooters();
                dispatch({ type: ScootersActions.SET_SCOOTERS, payload: { scooters } });
            } catch (err) {
                dispatch({ type: ScootersActions.SET_ERROR_MESSAGE, payload: err.message });
            }
        };
        deleteData();

        // setShowInputToDeleteScooters(false);
    };

    const handleShowSelectScooters = () => {
        setScooterParams({ ...initialScooterState, status: '' });

        if (showInputToSelectScooters) {
            const fetchData = async (): Promise<void> => {
                try {
                    const scooters = await getScooters();
                    dispatch({ type: ScootersActions.SET_SCOOTERS, payload: { scooters } });
                } catch (err) {
                    dispatch({ type: ScootersActions.SET_ERROR_MESSAGE, payload: err.message });
                }
            };
            fetchData();
        }

        setShowInputToSelectScooters(true);
        setShowInputToAddScooters(false);
        setShowInputToDeleteScooters(false);
        setShowInputToUpdateScooters(false);
    };

    const handleShowAddScooter = () => {
        setScooterParams(initialScooterState);
        if (showInputToSelectScooters) {
            const fetchData = async (): Promise<void> => {
                try {
                    const scooters = await getScooters();
                    dispatch({ type: ScootersActions.SET_SCOOTERS, payload: { scooters } });
                } catch (err) {
                    dispatch({ type: ScootersActions.SET_ERROR_MESSAGE, payload: err.message });
                }
            };
            fetchData();
        }

        setShowInputToAddScooters(true);
        setShowInputToSelectScooters(false);
        setShowInputToDeleteScooters(false);
        setShowInputToUpdateScooters(false);
    };

    const handleShowDeleteScooter = () => {
        setScooterParams(initialScooterState);

        if (showInputToSelectScooters) {
            const fetchData = async (): Promise<void> => {
                try {
                    const scooters = await getScooters();
                    dispatch({ type: ScootersActions.SET_SCOOTERS, payload: { scooters } });
                } catch (err) {
                    dispatch({ type: ScootersActions.SET_ERROR_MESSAGE, payload: err.message });
                }
            };
            fetchData();
        }

        setShowInputToDeleteScooters(true);
        setShowInputToSelectScooters(false);
        setShowInputToAddScooters(false);
        setShowInputToUpdateScooters(false);
    };

    const handleShowUpdateScooter = () => {
        setScooterParams(initialScooterState);

        if (showInputToSelectScooters) {
            const fetchData = async (): Promise<void> => {
                try {
                    const scooters = await getScooters();
                    dispatch({ type: ScootersActions.SET_SCOOTERS, payload: { scooters } });
                } catch (err) {
                    dispatch({ type: ScootersActions.SET_ERROR_MESSAGE, payload: err.message });
                }
            };
            fetchData();
        }

        setShowInputToUpdateScooters(true);
        setShowInputToDeleteScooters(false);
        setShowInputToSelectScooters(false);
        setShowInputToAddScooters(false);

        const fetchData = async (): Promise<void> => {
            try {
                const scooters = await getScooters();
                dispatch({ type: ScootersActions.SET_SCOOTERS, payload: { scooters } });
            } catch (err) {
                dispatch({ type: ScootersActions.SET_ERROR_MESSAGE, payload: err.message });
            }
        };
        fetchData();
    };

    const scootersList = Object.values(state.scooters.data);
    return (
        <Scooters
            scootersList={scootersList}
            scooterParams={scooterParams}
            showInputToSelectScooters={showInputToSelectScooters}
            showInputToAddScooters={showInputToAddScooters}
            showInputToUpdateScooters={showInputToUpdateScooters}
            showInputToDeleteScooters={showInputToDeleteScooters}
            handleInputChange={handleInputChange}
            handleShowSelectScooters={handleShowSelectScooters}
            handleShowAddScooter={handleShowAddScooter}
            handleShowUpdateScooter={handleShowUpdateScooter}
            handleShowDeleteScooter={handleShowDeleteScooter}
            handleGetSelectedScooters={handleGetSelectedScooters}
            handleAddScooter={handleAddScooter}
            handleUpdateScooter={handleUpdateScooter}
            handleDeleteScooter={handleDeleteScooter}
        />
    );
};

export default ScootersWrapper;
