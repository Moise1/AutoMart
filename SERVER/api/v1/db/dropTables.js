import {
    Pool
} from 'pg';

import CONFIG from '../config/config'; 


class TableDropper {
    constructor() {

        this.pool = new Pool({
            connectionString: process.env.DATABASE_URL || CONFIG.dbPath
        });
        this.pool.on('connect', () => {
            console.log('Tables dropped');
        });

        this.dropTables(); 
    }

    async dropTables(){

        const removeTables = 
        `DROP TABLE IF EXISTS users, ads, orders CASCADE;`;

         this.pool.query(removeTables)
         .then((res) => {

         })
         .catch((err) => {
             console.log(err);
         });
    }
}

new TableDropper();