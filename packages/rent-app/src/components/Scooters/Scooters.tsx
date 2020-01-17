import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { addScooter, deleteScooter, getScooters, getScootersBy, updateScooter } from '../../api/';
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
    const [selectedParams, setSelectedParams] = useState({ id: undefined, name: undefined });
    const [selectedIdToDelete, setIdToDelete] = useState();
    const [selectedParamsToUpdate, setSelectedParamsToUpdate] = useState({
        id: undefined,
        name: undefined,
        model: undefined,
        status: undefined,
    });
    const [selectedParamsToAdd, setSelectedParamsToAdd] = useState({
        name: undefined,
        model: undefined,
        status: undefined,
    });
    const [showInputToSelectScooters, setShowInputToSelectScooters] = useState(false);
    const [showInputToAddScooters, setShowInputToAddScooters] = useState(false);
    const [showInputToDeleteScooters, setShowInputToDeleteScooters] = useState(false);
    const [showInputToUpdateScooters, setShowInputToUpdateScooters] = useState(false);

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

    useEffect(() => {
        fetchData();
    }, []);

    // fetch selected scooters by params
    const handleChangeId = e => {
        setSelectedParams({ ...selectedParams, id: e.target.value });
    };
    const handleChangeName = e => {
        setSelectedParams({ ...selectedParams, name: e.target.value });
    };

    // Update scooter
    const handleChangeUpdateId = e => {
        setSelectedParamsToUpdate({ ...selectedParamsToUpdate, id: e.target.value });
    };
    const handleChangeUpdateName = e => {
        setSelectedParamsToUpdate({ ...selectedParamsToUpdate, name: e.target.value });
    };

    const handleChangeUpdateStatus = e => {
        setSelectedParamsToUpdate({ ...selectedParamsToUpdate, status: e.target.value });
    };

    // Add scooter
    const handleChangeUpdateModel = e => {
        setSelectedParamsToUpdate({ ...selectedParamsToUpdate, model: e.target.value });
    };

    const handleChangeAddName = e => {
        setSelectedParamsToAdd({ ...selectedParamsToAdd, name: e.target.value });
    };

    const handleChangeAddStatus = e => {
        setSelectedParamsToAdd({ ...selectedParamsToAdd, status: e.target.value });
    };

    const handleChangeAddModel = e => {
        setSelectedParamsToAdd({ ...selectedParamsToAdd, model: e.target.value });
    };

    // Delete scooter
    const handleSelectIdToDelete = e => {
        setIdToDelete(e.target.value);
    };

    // Fetch scooters
    const handleGetSelectedScooters = () => {
        //getAvailableScooters()

        const updateData = async () => {
            try {
                const scooters = await getScootersBy(selectedParams);
                dispatch({ type: ScootersActions.SET_SCOOTERS, payload: { scooters } });
            } catch (err) {
                console.log(err);
            }
        };
        updateData();

        setShowInputToSelectScooters(false);
    };

    // Update scooter
    const handleUpdateScooter = () => {
        const { id, name, model, status } = selectedParamsToUpdate;

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
        setShowInputToUpdateScooters(false);
    };

    // Add scooter
    const handleAddScooter = () => {
        const { name, model, status } = selectedParamsToAdd;

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

        setShowInputToAddScooters(false);
    };

    const handleDeleteScooter = () => {
        const deleteData = async (): Promise<void> => {
            try {
                await deleteScooter(selectedIdToDelete);
                dispatch({ type: ScootersActions.DELETE_SCOOTER, payload: selectedIdToDelete });

                const scooters = await getScooters();
                dispatch({ type: ScootersActions.SET_SCOOTERS, payload: { scooters } });
            } catch (err) {
                dispatch({ type: ScootersActions.SET_ERROR_MESSAGE, payload: err.message });
            }
        };
        deleteData();

        setShowInputToDeleteScooters(false);
    };

    const handleShowSelectScooters = () => {
        setShowInputToSelectScooters(true);
        setShowInputToAddScooters(false);
        setShowInputToDeleteScooters(false);
        setShowInputToUpdateScooters(false);
    };

    const handleShowAddScooter = () => {
        setShowInputToAddScooters(true);
        setShowInputToSelectScooters(false);
        setShowInputToDeleteScooters(false);
        setShowInputToUpdateScooters(false);
    };

    const handleShowDeleteScooter = () => {
        setShowInputToDeleteScooters(true);
        setShowInputToSelectScooters(false);
        setShowInputToAddScooters(false);
        setShowInputToUpdateScooters(false);
    };

    const handleShowUpdateScooter = () => {
        setShowInputToUpdateScooters(true);
        setShowInputToDeleteScooters(false);
        setShowInputToSelectScooters(false);
        setShowInputToAddScooters(false);
    };

    const scootersList = Object.values(state.scooters.data);

    return (
        <>
            <button onClick={handleShowSelectScooters}>Select scooters</button>
            <button onClick={handleShowAddScooter}>Add scooter</button>
            <button onClick={handleShowUpdateScooter}>Update scooter</button>
            <button onClick={handleShowDeleteScooter}>Delete scooter</button>
            {showInputToSelectScooters && (
                <div className="get-selected-scooters">
                    <input type="number" name="scooter id" value={selectedParams.id} onChange={handleChangeId} />
                    <input type="string" name="name" value={selectedParams.name} onChange={handleChangeName} />
                    <button onClick={handleGetSelectedScooters}>Find</button>
                </div>
            )}
            {showInputToAddScooters && (
                <div className="update-scooters">
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={selectedParamsToAdd.name}
                            onChange={handleChangeAddName}
                        />
                    </label>
                    <input
                        type="text"
                        name="status"
                        value={selectedParamsToAdd.status}
                        onChange={handleChangeAddStatus}
                    />
                    <input type="text" name="model" value={selectedParamsToAdd.model} onChange={handleChangeAddModel} />
                    <button onClick={handleAddScooter}>Update</button>
                </div>
            )}
            {showInputToUpdateScooters && (
                <div className="update-scooters">
                    <input
                        type="number"
                        name="scooter id"
                        value={selectedParamsToUpdate.id}
                        onChange={handleChangeUpdateId}
                    />
                    <input
                        type="string"
                        name="name"
                        value={selectedParamsToUpdate.name}
                        onChange={handleChangeUpdateName}
                    />
                    <input
                        type="string"
                        name="status"
                        value={selectedParamsToUpdate.status}
                        onChange={handleChangeUpdateStatus}
                    />
                    <input
                        type="string"
                        name="model"
                        value={selectedParamsToUpdate.model}
                        onChange={handleChangeUpdateModel}
                    />
                    <button onClick={handleUpdateScooter}>Update</button>
                </div>
            )}
            {showInputToDeleteScooters && (
                <div className="delete-scooter">
                    <input
                        type="number"
                        name="scooter id"
                        value={selectedIdToDelete}
                        onChange={handleSelectIdToDelete}
                    />
                    <button onClick={handleDeleteScooter}>Delete</button>
                </div>
            )}
            <ScootersList>
                {scootersList.map(scooter => (
                    <Scooter key={scooter.id}>
                        <div>{scooter.id}</div>
                        <div>{scooter.name}</div>
                        <div>{scooter.status}</div>
                        <div>{scooter.model}</div>
                    </Scooter>
                ))}
            </ScootersList>
        </>
    );
};

export default Scooters;
