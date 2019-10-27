import React from 'react';
import { InputLabel, MenuItem, Select } from '@material-ui/core';

type ValueType = {
    id: number;
    name: string;
};

interface SelectProps {
    label: string;
    onChange: (event: React.ChangeEvent<{ name?: string; value: ValueType }>) => void;
    value: ValueType;
    data: Array<ValueType>;
}

const SelectAvailableItem: React.FunctionComponent<SelectProps> = ({ label, data, value, onChange }) => (
    <React.Fragment>
        <InputLabel htmlFor="simple-select">{label}</InputLabel>
        <Select
            value={value}
            onChange={onChange}
            inputProps={{
                name: 'available item',
                id: 'simple-select',
            }}
        >
            {data.map((item: { id: number; name: string }) => (
                <MenuItem key={item.id} value={item}>
                    {item.name}
                </MenuItem>
            ))}
        </Select>
    </React.Fragment>
);
export default SelectAvailableItem;
