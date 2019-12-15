import { User } from '../models/userModel';
import { NewDataBase } from '../database/database';

class UserController {
    async getUsers() {
        const connection = await NewDataBase.Get();
        return await connection.getRepository(User).find();
    }

    async getUsersBy(params) {
        const { id } = params;

        const connection = await NewDataBase.Get();
        return await connection.getRepository(User).find({ where: [{ id }] });
    }

    async insertUsers(users: any) {
        const connection = await NewDataBase.Get();

        await connection
            .createQueryBuilder()
            .insert()
            .into(User)
            .values(users)
            .execute();
    }

    async updateUser(user) {
        const connection = await NewDataBase.Get();

        await connection
            .createQueryBuilder()
            .update(User)
            .set(user)
            .where('id = :id', { id: user.id })
            .execute();
    }

    async deleteUsers(id) {
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
