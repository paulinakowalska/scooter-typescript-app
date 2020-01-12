import React from 'react';
import { InputLabel, MenuItem, Select } from '@material-ui/core';

interface SelectProps {
    label: string;
    onChange: (event: React.ChangeEvent<{ name?: string; value: number }>) => void;
    value: number;
    data: Array<number>;
}

const SelectAvailableItem: React.FunctionComponent<SelectProps> = ({ label, data, value, onChange }) => (
    <React.Fragment>
        <InputLabel htmlFor="simple-select">{label}</InputLabel>
        <Select
            value={value}
            onChange={onChange}
            native={false}
            inputProps={{
                name: 'available item',
                id: 'simple-select',
            }}
        >
            {data.map(item => (
                <MenuItem key={item} value={item}>
                    {item}
                </MenuItem>
            ))}
        </Select>
    </React.Fragment>
);
export default SelectAvailableItem;
