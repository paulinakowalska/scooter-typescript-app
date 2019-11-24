const eventsData = require('../database/events.json');

type EventFilterParams = {
    eventId: string;
    userId: string;
    scooterId: string;
    startDate: string;
    endDate: string;
};

type EventModel = {
    id: number;
    title: string;
    allDay: true;
    start: string;
    end: string;
    userId: string;
    scooterId: string;
};

class EventController {
    getEvents(): Array<EventModel> {
        return JSON.parse(JSON.stringify(eventsData));
    }

    getEventsBy(params: EventFilterParams): Array<EventModel> {
        const { eventId, userId, scooterId, startDate, endDate } = params;

        const data: Array<EventModel> = JSON.parse(JSON.stringify(eventsData));

        return data.filter(
            (data: EventModel) =>
                data.id === Number(eventId) ||
                (data.start === startDate && data.end === endDate) ||
                data.userId === userId ||
                data.scooterId === scooterId,
        );
    }
}

export default EventController;
