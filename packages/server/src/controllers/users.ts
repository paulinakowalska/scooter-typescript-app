import { User } from '../models/userModel';
import { NewDataBase } from '../database/database';

class UserController {
    static async getUsers() {
        const connection = await NewDataBase.Get();
        return await connection.getRepository(User).find();
    }

    static async insertUsers(users) {
        const connection = await NewDataBase.Get();

        await connection
            .createQueryBuilder()
            .insert()
            .into(User)
            .values(users)
            .execute();
    }

    static async deleteUsers(id) {
        const connection = await NewDataBase.Get();

        await connection
            .createQueryBuilder()
            .delete()
            .from(User)
            .where('id = :id', { id })
            .execute();
    }
}

export default UserController;
