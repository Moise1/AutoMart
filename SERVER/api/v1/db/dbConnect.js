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
             id BIGSERIAL UNIQUE NOT NULL PRIMARY KEY, 
             first_name  VARCHAR(50) NOT NULL, 
             last_name  VARCHAR(50) NOT NULL, 
             email VARCHAR(250) UNIQUE NOT NULL, 
             address VARCHAR(50) NOT NULL, 
             password VARCHAR(250) NOT NULL, 
             is_admin BOOL NOT NULL);

             CREATE TABLE IF NOT EXISTS ads(
                car_id BIGSERIAL  UNIQUE  NOT NULL PRIMARY KEY, 
                owner  VARCHAR(250) REFERENCES users(email) NOT NULL, 
                manufacturer  VARCHAR(50) NOT NULL, 
                body_type VARCHAR(50) NOT NULL, 
                model VARCHAR(50) NOT NULL, 
                state VARCHAR(50) NOT NULL, 
                status VARCHAR(50), 
                price FLOAT NOT NULL, 
                created_on DATE NOT NULL, 
                modified_on DATE);
            
                CREATE TABLE IF NOT EXISTS orders(
                    order_id BIGSERIAL  UNIQUE  NOT NULL, 
                    buyer  VARCHAR(250) REFERENCES users(email) NOT NULL, 
                    car_id BIGINT REFERENCES ads(car_id),
                    price_offered FLOAT NOT NULL,
                    new_price_offered FLOAT, 
                    status VARCHAR(50),
                    created_on DATE NOT NULL, 
                    modified_on DATE);`;

        this.pool.query(tables)
            .then((res) => {

            })
            .catch((err) => {
                console.log(err);
            });
    };

}

new DBSetter();