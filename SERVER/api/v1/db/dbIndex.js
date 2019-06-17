import { Pool } from 'pg'; 
import CONFIG from '../config/config'; 

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || CONFIG.dbPath
});


export default {
    query(queryText, params) {
      return new Promise((resolve, reject) => {
        pool.query(queryText, params)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
      });
    },
  };