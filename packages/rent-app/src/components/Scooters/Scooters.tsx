import React from 'react';
import styled from 'styled-components';
import AddScooter from '../AddScooter/AddScooter';
import UpdateScooter from '../UpdateScooter/UpdateScooter';
import DeleteScooter from '../DeleteScooter/DeleteScooter';
import SelectScooters from '../SelectScooters/SelectScooters';
import ScootersList from '../ScootersList/ScootersList';

const ButtonsWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    margin-bottom: 40px;
`;

const ScooterButton = styled.button`
    border: 1px solid darkblue;
    border-radius: 15px;
    padding: 5px 15px;
    outline: none;
    height: 34px;
    cursor: pointer;

    &:hover {
        background: ${props => props.theme.colors.darkBlue};
        border: 1px solid ${props => props.theme.colors.white};
        color: ${props => props.theme.colors.white};
    }
`;

const ScooterInput = styled.input`
    height: 28px;
    margin-left: 10px;
    //border-radius: 15px;
    outline: none;
`;

const ScooterOptionsWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const ScooterLabel = styled.label`
    display: flex;
    font-size: ${props => props.theme.fonts.size.medium};
    margin: ${props => props.theme.space.large};
    align-items: center;
`;

interface ScootersProps {
    scootersList: Array<{ id: number | string; name: string; status: string; model: string }>;
    scooterParams: { id: number | string; name: string; status: string; model: string };
    showInputToSelectScooters: boolean;
    showInputToAddScooters: boolean;
    showInputToUpdateScooters: boolean;
    showInputToDeleteScooters: boolean;
    handleShowSelectScooters: () => void;
    handleShowAddScooter: () => void;
    handleShowUpdateScooter: () => void;
    handleShowDeleteScooter: () => void;
    handleGetSelectedScooters: () => void;
    handleAddScooter: () => void;
    handleUpdateScooter: () => void;
    handleDeleteScooter: () => void;
    handleInputChange: (e: any) => void;
}

const Scooters: React.FunctionComponent<ScootersProps> = ({
    scootersList,
    scooterParams,
    showInputToSelectScooters,
    showInputToAddScooters,
    showInputToUpdateScooters,
    showInputToDeleteScooters,
    handleInputChange,
    handleShowSelectScooters,
    handleShowAddScooter,
    handleShowUpdateScooter,
    handleShowDeleteScooter,
    handleGetSelectedScooters,
    handleAddScooter,
    handleUpdateScooter,
    handleDeleteScooter,
}) => (
    <>
        <ButtonsWrapper>
            <ScooterButton onClick={handleShowSelectScooters}>Select scooters</ScooterButton>
            <ScooterButton onClick={handleShowAddScooter}>Add scooter</ScooterButton>
            <ScooterButton onClick={handleShowUpdateScooter}>Update scooter</ScooterButton>
            <ScooterButton onClick={handleShowDeleteScooter}>Delete scooter</ScooterButton>
        </ButtonsWrapper>
        {showInputToSelectScooters && (
            <SelectScooters
                ScooterInput={ScooterInput}
                ScooterOptionsWrapper={ScooterOptionsWrapper}
                ScooterButton={ScooterButton}
                ScooterLabel={ScooterLabel}
                scooterParams={scooterParams}
                handleInputChange={handleInputChange}
                handleGetSelectedScooters={handleGetSelectedScooters}
            />
        )}
        {showInputToAddScooters && (
            <AddScooter
                ScooterInput={ScooterInput}
                ScooterOptionsWrapper={ScooterOptionsWrapper}
                ScooterButton={ScooterButton}
                ScooterLabel={ScooterLabel}
                scooterParams={scooterParams}
                handleInputChange={handleInputChange}
                handleAddScooter={handleAddScooter}
            />
        )}
        {showInputToUpdateScooters && (
            <UpdateScooter
                ScooterInput={ScooterInput}
                ScooterOptionsWrapper={ScooterOptionsWrapper}
                ScooterButton={ScooterButton}
                ScooterLabel={ScooterLabel}
                scooterParams={scooterParams}
                handleInputChange={handleInputChange}
                handleUpdateScooter={handleUpdateScooter}
            />
        )}
        {showInputToDeleteScooters && (
            <DeleteScooter
                ScooterInput={ScooterInput}
                ScooterOptionsWrapper={ScooterOptionsWrapper}
                ScooterButton={ScooterButton}
                ScooterLabel={ScooterLabel}
                scooterParams={scooterParams}
                handleInputChange={handleInputChange}
                handleDeleteScooter={handleDeleteScooter}
            />
        )}
        <ScootersList scootersList={scootersList} />
    </>
);

export default Scooters;
