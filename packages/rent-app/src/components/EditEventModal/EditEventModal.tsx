import React from 'react';
import DatePicker from '../DatePicker/DatePicker';
import { Button, Modal } from '@material-ui/core';
import { Moment } from 'moment';

import styled from 'styled-components';

import SelectAvailableItem from '../SelectAvailableItem/SelectAvailableItem';
import { changeEvent } from '../../api';
import { useStore } from '../../context/ContextProvider';
import { EventsActions } from '../../context/events';

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
    onChangeStartDate: (startDate: Date) => void;
    onChangeEndDate: (endDate: Date) => void;
    selectedScooter: number;
    selectedEvent: { id?: number; title?: string };
    onChangeSelection: (event: React.ChangeEvent<{ name?: string; value: number }>) => void;
    scooterList: Array<number>;
    onDeleteEvent: (eventId: number) => void;
}

const EditEventModal: React.FunctionComponent<ModalProps> = ({
    open,
    onClose,
    startDate,
    endDate,
    onChangeStartDate,
    onChangeEndDate,
    selectedScooter,
    selectedEvent,
    onChangeSelection,
    scooterList,
    onDeleteEvent,
}) => {
    const { dispatch } = useStore();

    const handleAddEvent = () => {
        const updateData = async () => {
            try {
                const newEvent = {
                    id: selectedEvent.id,
                    name: selectedEvent.title,
                    startDate: startDate,
                    endDate: endDate,
                    userId: 15,
                    scooterId: selectedScooter,
                };

                await changeEvent(newEvent);
                dispatch({ type: EventsActions.UPDATE_EVENT, payload: newEvent });
            } catch (err) {
                console.log(err);
            }
        };
        updateData();

        onClose();
    };

    const handleDeleteEvent = () => {
        onDeleteEvent(selectedEvent.id);
        onClose();
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
                <Button onClick={handleDeleteEvent}>Delete</Button>
            </EventModalContainer>
        </Modal>
    );
};

export default EditEventModal;
