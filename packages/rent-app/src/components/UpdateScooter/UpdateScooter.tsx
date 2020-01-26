import React from 'react';
import styled, { StyledFunction } from 'styled-components';

interface UpdateScooterProps {
    ScooterInput: StyledFunction;
    ScooterOptionsWrapper: StyledFunction;
    ScooterButton: StyledFunction;
    ScooterLabel: StyledFunction;
    scooterParams: { id: number; name: string; status: string; model: string };
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
            <ScooterInput type="string" name="status" value={scooterParams.status} onChange={handleInputChange} />
        </ScooterLabel>
        <ScooterLabel>
            Model:
            <ScooterInput type="string" name="model" value={scooterParams.model} onChange={handleInputChange} />
        </ScooterLabel>
        <ScooterButton onClick={handleUpdateScooter}>Update</ScooterButton>
    </ScooterOptionsWrapper>
);

export default UpdateScooter;
