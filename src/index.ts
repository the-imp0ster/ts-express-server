import express, {Request, Response} from 'express';
import { createDbConnection, initializeTables } from './database';
// import sqlite3 from 'sqlite3';

const app = express();
const PORT = 6969;

// parse json requests (middleware)
app.use(express.json());

// connect to db before starting server
const db = createDbConnection();
initializeTables(db);

// route to test server
app.get('/', (req: Request, res: Response) => {
    res.send('bing bong typescript express sqlite');
});

// example route to fetch users (example table from database.ts)
app.get('/users', (req: Request, res: Response) => {
    db.all('SELECT * FROM users', (err: Error, rows: any[]) => {
        if (err) {
            res.status(500).json({error: 'failed to retrieve users'});
        } else {
            res.json(rows);
        }
    });
});

// start the server
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});