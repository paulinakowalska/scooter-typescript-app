import express from 'express';
import bodyParser from 'body-parser';
import loggerMiddleware from './middlewares/loggerMiddleware';
import routes from './routes';
import cors from 'cors';
import 'reflect-metadata';
import { NewDataBase } from './database/database';
import { User } from './models/userModel';

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(loggerMiddleware);

app.use('/api', routes);

// test connection to db
app.get('/test', async (req, res) => {
    console.log(req);
    try {
        const user = new User();
        user.name = 'Username';

        const db = await NewDataBase.Get();
        await db.synchronize();
        await db.manager.save(user);

        res.send(`Photo has been saved. Photo id is `);
        res.send(db);
    } catch (e) {
        res.send(e);
        // return e;
    }
});

export default app;
