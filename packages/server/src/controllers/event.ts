import { NewDataBase } from '../database/database';
import { Event } from '../models/eventModel';
import UserController from '../controllers/users';

type EventFilterParams = {
    eventId?: string;
    userId?: string;
    scooterId?: string;
    startDate?: string;
    endDate?: string;
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

    async insertEvent(events) {
        const connection = await NewDataBase.Get();

        await new UserController().getUsersBy({ id: events.userId });

        await connection
            .createQueryBuilder()
            .insert()
            .into(Event)
            .values(events)
            .execute();
    }

    async updateEvent(event) {
        const connection = await NewDataBase.Get();

        await connection
            .createQueryBuilder()
            .update(Event)
            .set(event)
            .where('id = :id', { id: event.id })
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
