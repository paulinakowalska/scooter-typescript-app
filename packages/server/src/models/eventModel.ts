class EventModel {
    private id: number;
    private start: string;
    private end: string;
    private scooterId: number;

    constructor(id: number, start, end, scooterId) {
        this.id = id;
        this.start = start;
        this.end = end;
        this.scooterId = scooterId;
    }

    getId() {
        return this.id;
    }

    getStart() {
        return this.start;
    }

    getEnd() {
        return this.end;
    }

    getScooterId() {
        return this.scooterId;
    }
}

export default EventModel;
