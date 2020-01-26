import React from 'react';
import styled from 'styled-components';

import { MenuItem, Select } from '@material-ui/core';

const SelectWrapper = styled.div`
    margin-left: 10px;
`;

interface ScooterStatusListProps {
    value: string;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const scooterStatusList = ['available', 'not available', 'broken', 'repairing'];

const ScooterStatusList: React.FunctionComponent<ScooterStatusListProps> = ({ value, handleInputChange }) => (
    <SelectWrapper>
        <Select
            value={value}
            onChange={handleInputChange}
            native={false}
            inputProps={{
                name: 'status',
                id: 'simple-select',
            }}
        >
            {scooterStatusList.map(item => (
                <MenuItem key={item} value={item}>
                    {item}
                </MenuItem>
            ))}
        </Select>
    </SelectWrapper>
);

export default ScooterStatusList;
