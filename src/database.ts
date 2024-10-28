import sqlite3 from "sqlite3";

sqlite3.verbose();

const dbFile = './database.sqlite';

// create a new db connection
export const createDbConnection = () => {
    return new sqlite3.Database(dbFile, (err) => {
        if (err) {
            console.error(`error connecting to sqlite db: `, err.message);
        } else {
            console.log('connect to db');
        }
    });
};

// example table creation
export const initializeTables = (db: sqlite3.Database) => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL)
        `, (err) => {
        if (err) {
            console.error('error creating tables: ', err.message);
        } else {
            console.log('tables initialized');
        }
    });
};

