import { NewDataBase } from '../database/database';
import { Event } from '../models/eventModel';

type EventFilterParams = {
    eventId: string;
    userId: string;
    scooterId: string;
    startDate: string;
    endDate: string;
};

class EventController {
    async getEvents() {
        const connection = await NewDataBase.Get();
        return await connection.getRepository(Event).find();
    }

    async getEventsBy(params: EventFilterParams) {
        const { eventId, userId, scooterId, startDate, endDate } = params;

        const connection = await NewDataBase.Get();
        return await connection
            .getRepository(Event)
            .find({ where: [{ id: eventId }, { startDate }, { endDate }, { userId }, { scooterId }] });
    }

    async insertEvent(events: Event | string) {
        const connection = await NewDataBase.Get();

        await connection
            .createQueryBuilder()
            .insert()
            .into(Event)
            .values(events)
            .execute();
    }

    async deleteEvent(id) {
        const connection = await NewDataBase.Get();

        await connection
            .createQueryBuilder()
            .delete()
            .from(Event)
            .where('id = :id', { id })
            .execute();
    }
}

export default EventController;
