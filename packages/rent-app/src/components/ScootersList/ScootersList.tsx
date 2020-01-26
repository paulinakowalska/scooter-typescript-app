import React from 'react';
import styled from 'styled-components';

const ScootersListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 80px 0;
`;

const ScooterRow = styled.div`
    min-width: 200px;
    font-size: 16px;
`;

const ScooterId = styled.div`
    min-width: 100px;
    font-size: 16px;
`;

const Scooter = styled.div`
    display: flex;
    padding-bottom: ${props => props.theme.space.medium};
    padding-left: ${props => props.theme.space.large};
`;

const Labels = styled.div`
    display: flex;
    padding-bottom: ${props => props.theme.space.large};
    padding-left: ${props => props.theme.space.large};
`;

const Label = styled.div`
    min-width: 200px;
    font-size: 18px;
`;

const LabelId = styled.div`
    min-width: 100px;
    font-size: 18px;
`;

interface ScootersListProps {
    scootersList: Array<{ id: number | string; name: string; status: string; model: string }>;
}

const ScootersList: React.FunctionComponent<ScootersListProps> = ({ scootersList }) => (
    <ScootersListWrapper>
        <Labels>
            <LabelId>ID</LabelId>
            <Label>NAME</Label>
            <Label>STATUS</Label>
            <Label>MODEL</Label>
        </Labels>
        {scootersList.map(scooter => (
            <Scooter key={scooter.id}>
                <ScooterId>{scooter.id}</ScooterId>
                <ScooterRow>{scooter.name}</ScooterRow>
                <ScooterRow>{scooter.status}</ScooterRow>
                <ScooterRow>{scooter.model}</ScooterRow>
            </Scooter>
        ))}
    </ScootersListWrapper>
);

export default ScootersList;
