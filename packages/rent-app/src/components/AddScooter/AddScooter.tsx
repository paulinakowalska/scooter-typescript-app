import React from 'react';
import { StyledFunction } from 'styled-components';
import ScooterStatusList from '../ScooterStatusList/ScooterStatusList';

interface AddScooterProps {
    ScooterInput: StyledFunction;
    ScooterOptionsWrapper: StyledFunction;
    ScooterButton: StyledFunction;
    ScooterLabel: StyledFunction;
    scooterParams: { id: number | string; name: string; status: string; model: string };
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleAddScooter: () => void;
}

const AddScooter: React.FunctionComponent<AddScooterProps> = ({
    ScooterInput,
    ScooterOptionsWrapper,
    ScooterButton,
    ScooterLabel,
    scooterParams,
    handleInputChange,
    handleAddScooter,
}) => (
    <ScooterOptionsWrapper>
        <ScooterLabel>
            Name:
            <ScooterInput type="text" name="name" value={scooterParams.name} onChange={handleInputChange} />
        </ScooterLabel>
        <ScooterLabel>
            Status:
            <ScooterStatusList value={scooterParams.status} handleInputChange={handleInputChange} />
        </ScooterLabel>
        <ScooterLabel>
            Model:
            <ScooterInput type="text" name="model" value={scooterParams.model} onChange={handleInputChange} />
        </ScooterLabel>
        <ScooterButton onClick={handleAddScooter}>Add</ScooterButton>
    </ScooterOptionsWrapper>
);

export default AddScooter;
