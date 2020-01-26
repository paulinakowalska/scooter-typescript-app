import { NewDataBase } from '../database/database';
import { Event } from '../models/eventModel';
import UserController from '../controllers/users';
import ScooterController from '../controllers/scooter';
import moment from 'moment';

type EventFilterParams = {
    eventId?: string;
    startDate?: number;
    endDate?: number;
    userId?: string;
    scooterId?: string;
};

type EventOptions = {
    id?: number;
    name: string;
    startDate: number;
    endDate: number;
    userId: number;
    scooterId: number;
};

class EventController {
    async getEvents() {
        const connection = await NewDataBase.Get();

        const eventRepository = connection.getRepository(Event);
        const events = await eventRepository.find({ relations: ['scooter', 'user'] });
        return events.map((event: Event) => ({
            ...event,
            startDate: moment(event.startDate)
                .utc()
                .valueOf(),
            endDate: moment(event.endDate)
                .utc()
                .valueOf(),
        }));
    }

    async getEventsBy(params: EventFilterParams) {
        const { eventId, userId, scooterId, startDate, endDate } = params;

        const connection = await NewDataBase.Get();

        const eventRepository = connection.getRepository(Event);
        return await eventRepository.find({
            relations: ['scooter', 'user'],
            where: [{ id: eventId }, { startDate }, { endDate }, { user: userId }, { scooter: scooterId }],
        });
    }

    async insertEvent(options: EventOptions) {
        const [user] = await new UserController().getUsersBy({ id: options.userId });
        const [scooter] = await new ScooterController().getScootersBy({ id: options.scooterId });

        const event = new Event();
        event.name = options.name;
        event.startDate = moment.utc(options.startDate).toDate();
        event.endDate = moment.utc(options.endDate).toDate();
        event.user = user;
        event.scooter = scooter;

        const connection = await NewDataBase.Get();

        await connection.manager.save(event);
    }

    async updateEvent(options: EventOptions) {
        const [user] = await new UserController().getUsersBy({ id: options.userId });
        const [scooter] = await new ScooterController().getScootersBy({ id: options.scooterId });

        const event = new Event();

        event.name = options.name;
        event.startDate = moment.utc(options.startDate).toDate();
        event.endDate = moment.utc(options.endDate).toDate();
        event.user = user;
        event.scooter = scooter;

        const connection = await NewDataBase.Get();

        await connection.manager.update(Event, options.id, event);
    }

    async deleteEvent(id: string) {
        const connection = await NewDataBase.Get();

        await connection.manager.delete(Event, id);
    }
}

export default EventController;
