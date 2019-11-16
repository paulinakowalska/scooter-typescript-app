const eventsData = require('../database/events.json');

class EventController {
    getEvents() {
        return JSON.parse(JSON.stringify(eventsData));
    }

    getEventsBy(params) {
        const { eventId, userId, scooterId, startDate, endDate } = params;

        const data = JSON.parse(JSON.stringify(eventsData));

        return data.filter(
            ({ id, start, end }: { id: number; start: string; end: string }) =>
                id === Number(eventId) || start === startDate || end === endDate,
        );
    }
}

export default EventController;
