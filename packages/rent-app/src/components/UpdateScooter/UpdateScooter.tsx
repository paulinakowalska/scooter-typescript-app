import React from 'react';
import { StyledFunction } from 'styled-components';
import ScooterStatusList from '../ScooterStatusList/ScooterStatusList';

interface UpdateScooterProps {
    ScooterInput: StyledFunction;
    ScooterOptionsWrapper: StyledFunction;
    ScooterButton: StyledFunction;
    ScooterLabel: StyledFunction;
    scooterParams: { id: number | string; name: string; status: string; model: string };
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleUpdateScooter: () => void;
}

const UpdateScooter: React.FunctionComponent<UpdateScooterProps> = ({
    ScooterInput,
    ScooterOptionsWrapper,
    ScooterButton,
    ScooterLabel,
    scooterParams,
    handleInputChange,
    handleUpdateScooter,
}) => (
    <ScooterOptionsWrapper>
        <ScooterLabel>
            Id:
            <ScooterInput type="number" name="id" value={scooterParams.id} onChange={handleInputChange} />
        </ScooterLabel>
        <ScooterLabel>
            Name:
            <ScooterInput type="string" name="name" value={scooterParams.name} onChange={handleInputChange} />
        </ScooterLabel>
        <ScooterLabel>
            Status:
            <ScooterStatusList value={scooterParams.status} handleInputChange={handleInputChange} />
        </ScooterLabel>
        <ScooterLabel>
            Model:
            <ScooterInput type="string" name="model" value={scooterParams.model} onChange={handleInputChange} />
        </ScooterLabel>
        <ScooterButton onClick={handleUpdateScooter}>Update</ScooterButton>
    </ScooterOptionsWrapper>
);

export default UpdateScooter;
