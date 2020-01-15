import React from 'react';
import DatePicker from '../DatePicker/DatePicker';
import { Modal, Button } from '@material-ui/core';
import styled from 'styled-components';
import { Moment } from 'moment';

import SelectAvailableItem from '../SelectAvailableItem/SelectAvailableItem';

const EventModalContainer = styled.div`
    position: absolute;
    width: 400px;
    background-color: ${props => props.theme.colors.white};
    border: 3px, solid, ${props => props.theme.colors.darkBlue};
    padding: ${props => props.theme.space.small};

    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

interface ModalProps {
    open: boolean;
    onClose: () => void;
    startDate: Moment;
    endDate: Moment;
    onChangeStartDate: (Date) => void;
    onChangeEndDate: (Date) => void;
    selectedScooter: number;
    onChangeSelection: (event: React.ChangeEvent<{ name?: string; value: number }>) => void;
    scooterList: Array<number>;
    onAddEvent: () => void;
}

const EventModal: React.FunctionComponent<ModalProps> = ({
    open,
    onClose,
    startDate,
    endDate,
    onChangeStartDate,
    onChangeEndDate,
    selectedScooter,
    onChangeSelection,
    scooterList,
    onAddEvent,
}) => {
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
                        value={selectedScooter}
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
