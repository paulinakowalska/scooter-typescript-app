const EventData = require('./../views/events.json');

type FilterEventParamsType = {
    id: number;
    start: string;
    end: string;
};

class EventModel {
    private data: Array<object>;

    constructor() {
        this.data = JSON.parse(JSON.stringify(EventData));
    }

    get events() {
        return this.data;
    }

    getSelectedEvents(params) {
        const { eventId, userId, scooterId, startDate, endDate } = params;

        return this.data.filter(
            ({ id, start, end }: FilterEventParamsType) =>
                id === Number(eventId) || start === startDate || end === endDate,
        );
    }
}

module.exports = EventModel;
