import React from 'react';
import { StyledFunction } from 'styled-components';

interface SelectScooterProps {
    ScooterInput: StyledFunction;
    ScooterOptionsWrapper: StyledFunction;
    ScooterButton: StyledFunction;
    ScooterLabel: StyledFunction;
    scooterParams: { id: number; name: string; status: string; model: string };
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleGetSelectedScooters: () => void;
}

const SelectScooters: React.FunctionComponent<SelectScooterProps> = ({
    ScooterInput,
    ScooterOptionsWrapper,
    ScooterButton,
    ScooterLabel,
    scooterParams,
    handleInputChange,
    handleGetSelectedScooters,
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

        <ScooterButton onClick={handleGetSelectedScooters}>Find</ScooterButton>
    </ScooterOptionsWrapper>
);

export default SelectScooters;
