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
             is_admin BOOL NOT NULL);`;

        this.pool.query(tables)
            .then((res) => {

            })
            .catch((err) => {
                console.log(err);
            });
    };

}

new DBSetter();