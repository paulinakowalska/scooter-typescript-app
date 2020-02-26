import { NewDataBase } from '../database/database';
import { Scooter } from '../models/scooterModel';
import { Event } from '../models/eventModel';
import { Any, MoreThanOrEqual, LessThanOrEqual, Not } from 'typeorm';

type ScootersFilterParams = {
    id?: number;
    name?: string;
    model?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
};

type ScooterOptions = {
    id?: number;
    name: string;
    model: string;
    status: string;
};

class ScooterController {
    async getScooters() {
        const connection = await NewDataBase.Get();
        return await connection.getRepository(Scooter).find();
    }

    async getScootersBy(params: ScootersFilterParams) {
        try {
            const { id, name, model, status, startDate, endDate } = params;

            const connection = await NewDataBase.Get();
            const eventRepository = connection.getRepository(Event);
            const eventsFilteredByDate = await eventRepository.find({
                relations: ['scooter', 'user'],
                where: [{ startDate }, { endDate }],
            });

            const eventIdsFilteredByDate = eventsFilteredByDate.map(event => event.scooter && event.scooter.id);

            return await connection
                .getRepository(Scooter)
                .find({ where: [{ id }, { name }, { model }, { status }, { id: Any(eventIdsFilteredByDate) }] });
        } catch (err) {
            console.log(err);
        }
    }

    async getAvailableScooters(params: ScootersFilterParams) {
        try {
            const { id, name, model, status, startDate: eventStartDate, endDate: eventEndDate } = params;
            const sd = eventStartDate;
            const ed = eventEndDate;

            const connection = await NewDataBase.Get();
            const eventRepository = connection.getRepository(Event);
            const eventsFilteredByDate = await eventRepository.find({
                relations: ['scooter', 'user'],
                where: [{ startDate: LessThanOrEqual(sd), endDate: MoreThanOrEqual(ed) }],
            });

            const eventIdsFilteredByDate = eventsFilteredByDate.map(event => event.scooter && event.scooter.id);
            return await connection
                .getRepository(Scooter)
                .find({ where: [{ id }, { name }, { model }, { status }, { id: Not(Any(eventIdsFilteredByDate)) }] });
        } catch (err) {
            console.log(err);
        }
    }

    async insertScooters(options: ScooterOptions) {
        const scooter = new Scooter();

        scooter.name = options.name;
        scooter.model = options.model;
        scooter.status = options.status;

        const connection = await NewDataBase.Get();

        await connection.manager.save(scooter);
    }

    async updateScooter(options: ScooterOptions) {
        const scooter = new Scooter();

        scooter.name = options.name;
        scooter.model = options.model;
        scooter.status = options.status;

        const connection = await NewDataBase.Get();

        await connection.manager.update(Scooter, options.id, scooter);
    }

    async deleteScooter(id: string) {
        const connection = await NewDataBase.Get();

        await connection.manager.delete(Scooter, id);
    }
}

export default ScooterController;
