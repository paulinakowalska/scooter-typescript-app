import React from 'react';
import DatePicker from '../DatePicker/DatePicker';
import { Modal, Button } from '@material-ui/core';
import styled from 'styled-components';

import SelectAvailableItem from '../SelectAvailableItem/SelectAvailableItem';

const EventModalContainer = styled.div`
    position: absolute;
    width: 400px;
    background-color: ${props => props.theme.colors.lightPink};
    border: 3px, solid, ${props => props.theme.colors.darkBlue};
    padding: ${props => props.theme.space.small};

    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

type ValueType = {
    id: number;
    name: string;
};

interface ModalProps {
    open: boolean;
    onClose: () => void;
    startDate: Date;
    endDate: Date;
    onChangeStartDate: (Date) => void;
    onChangeEndDate: (Date) => void;
    selectedValue: {};
    onChangeSelection: (event: React.ChangeEvent<{ name?: string; value: ValueType }>) => void;
    scooterList: Array<ValueType>;
    onAddEvent: () => void;
}

const EventModal: React.FunctionComponent = ({
    open,
    onClose,
    startDate,
    endDate,
    onChangeStartDate,
    onChangeEndDate,
    selectedValue,
    onChangeSelection,
    scooterList,
    onAddEvent,
}: ModalProps) => {
    const handleAddEvent = () => {
        onClose();
        onAddEvent();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <EventModalContainer>
                <DatePicker date={startDate} handleDateChange={onChangeStartDate} />
                <DatePicker date={endDate} handleDateChange={onChangeEndDate} />
                {startDate && endDate ? (
                    <SelectAvailableItem
                        label="Scooters"
                        data={scooterList}
                        value={selectedValue}
                        onChange={onChangeSelection}
                    />
                ) : (
                    <div>Please select start and end date</div>
                )}
                <Button variant="contained" color="primary" onClick={handleAddEvent}>
                    Confirm
                </Button>
            </EventModalContainer>
        </Modal>
    );
};

export default EventModal;
