import { User } from '../models/userModel';
import { NewDataBase } from '../database/database';

type UserParams = {
    id: number;
};

type UserOptions = {
    id?: number;
    name: string;
    firstName: string;
    lastName: string;
    mail: string;
    phoneNumber: string;
    role: string;
};

class UserController {
    async getUsers() {
        const connection = await NewDataBase.Get();
        return await connection.getRepository(User).find();
    }

    async getUsersBy(params: UserParams) {
        const { id } = params;

        const connection = await NewDataBase.Get();
        return await connection.getRepository(User).find({ where: [{ id }] });
    }

    async insertUsers(options: UserOptions) {
        const user = new User();

        user.name = options.name;
        user.firstName = options.firstName;
        user.lastName = options.lastName;
        user.mail = options.mail;
        user.phoneNumber = options.phoneNumber;
        user.role = options.role;

        const connection = await NewDataBase.Get();

        await connection.manager.save(user);
    }

    async updateUser(options: UserOptions) {
        const user = new User();

        user.name = options.name;
        user.firstName = options.firstName;
        user.lastName = options.lastName;
        user.mail = options.mail;
        user.phoneNumber = options.phoneNumber;
        user.role = options.role;

        const connection = await NewDataBase.Get();

        await connection.manager.update(User, options.id, user);
    }

    async deleteUsers(id: string) {
        const connection = await NewDataBase.Get();

        await connection.manager.delete(User, id);
    }
}

export default UserController;
