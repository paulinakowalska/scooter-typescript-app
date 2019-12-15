import { NewDataBase } from '../database/database';
import { Scooter } from '../models/scooterModel';

class ScooterController {
    async getScooters() {
        const connection = await NewDataBase.Get();
        return await connection.getRepository(Scooter).find();
    }

    async getScootersBy(params: any) {
        const { scooterId, startDate, endDate } = params;

        const connection = await NewDataBase.Get();
        return await connection.getRepository(Scooter).find({ where: [{ id: scooterId }, { startDate }, { endDate }] });
    }

    async insertScooters(scooters: any) {
        const connection = await NewDataBase.Get();

        await connection
            .createQueryBuilder()
            .insert()
            .into(Scooter)
            .values(scooters)
            .execute();
    }

    async updateScooter(scooter) {
        const connection = await NewDataBase.Get();

        await connection
            .createQueryBuilder()
            .update(Scooter)
            .set(scooter)
            .where('id = :id', { id: scooter.id })
            .execute();
    }

    async deleteScooter(id) {
        const connection = await NewDataBase.Get();

        await connection
            .createQueryBuilder()
            .delete()
            .from(Scooter)
            .where('id = :id', { id })
            .execute();
    }
}

export default ScooterController;
