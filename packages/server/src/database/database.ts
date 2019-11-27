import { createConnection } from 'typeorm';
import { User } from '../models/userModel';
import { Scooter } from '../models/scooterModel';
import { Event } from '../models/eventModel';

class DbConnection {
    private db: null;
    private instance: number;

    constructor() {
        this.db = null;
        this.instance = 0;
    }

    private static async DbConnect() {
        try {
            return await createConnection({
                type: 'postgres',
                host: 'localhost',
                port: 32809,
                username: 'postgres',
                password: '',
                database: 'postgres',
                entities: [User, Scooter, Event],
                synchronize: false,
                logging: false,
            });
        } catch (e) {
            console.log(e);
            return e;
        }
    }

    public async Get() {
        try {
            this.instance++; // this is just to count how many times our singleton is called.
            console.log(`DbConnection called ${this.instance} times`);

            if (this.db != null) {
                console.log(`db connection is already alive`);
                return this.db;
            } else {
                console.log(`getting new db connection`);
                this.db = await DbConnection.DbConnect();
                return this.db;
            }
        } catch (e) {
            return e;
        }
    }
}

const NewDataBase = new DbConnection();

export { NewDataBase };
