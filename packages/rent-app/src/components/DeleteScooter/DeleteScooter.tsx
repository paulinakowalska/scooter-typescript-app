import React from 'react';
import { StyledFunction } from 'styled-components';

interface DeleteScooterProps {
    ScooterInput: StyledFunction;
    ScooterOptionsWrapper: StyledFunction;
    ScooterButton: StyledFunction;
    ScooterLabel: StyledFunction;
    scooterParams: { id: number; name: string; status: string; model: string };
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleDeleteScooter: () => void;
}

const DeleteScooter: React.FunctionComponent<DeleteScooterProps> = ({
    ScooterInput,
    ScooterOptionsWrapper,
    ScooterButton,
    ScooterLabel,
    scooterParams,
    handleInputChange,
    handleDeleteScooter,
}) => (
    <ScooterOptionsWrapper>
        <ScooterLabel>
            id:
            <ScooterInput type="number" name="id" value={scooterParams.id} onChange={handleInputChange} />
        </ScooterLabel>
        <ScooterButton onClick={handleDeleteScooter}>Delete</ScooterButton>
    </ScooterOptionsWrapper>
);

export default DeleteScooter;
