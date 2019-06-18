import {
    Pool
} from 'pg';
import CONFIG from '../config/config';


class DBSetter {
    constructor() {

        this.pool = new Pool({
            connectionString: process.env.DATABASE_URL || CONFIG.dbPath
        });
        this.pool.on('connect', () => {
            console.log('Connected to DB');
        });
        this.createTables();
    }

    async createTables() {

        const tables =

            `CREATE TABLE IF NOT EXISTS users(
             id BIGSERIAL  NOT NULL, 
             first_name  VARCHAR(50) NOT NULL, 
             last_name  VARCHAR(50) NOT NULL, 
             email VARCHAR(250) UNIQUE NOT NULL PRIMARY KEY, 
             address VARCHAR(50) NOT NULL, 
             password VARCHAR(250) NOT NULL, 
             is_admin BOOL NOT NULL);

             CREATE TABLE IF NOT EXISTS ads(
                car_id BIGSERIAL  UNIQUE  NOT NULL, 
                owner  VARCHAR(50) REFERENCES users(email) NOT NULL, 
                manufacturer  VARCHAR(50) NOT NULL, 
                body_type VARCHAR(50) NOT NULL, 
                model VARCHAR(50) NOT NULL, 
                state VARCHAR(50) NOT NULL, 
                status VARCHAR(50) NOT NULL, 
                price FLOAT NOT NULL, 
                created_on DATE NOT NULL);`;

        this.pool.query(tables)
            .then((res) => {

            })
            .catch((err) => {
                console.log(err);
            });
    };

}

new DBSetter();