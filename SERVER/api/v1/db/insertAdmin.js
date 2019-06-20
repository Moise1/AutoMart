import {
    Pool
} from 'pg';
import CONFIG from '../config/config';
import hasher from '../helpers/password';


class MakeAdmin {
    constructor() {

        this.pool = new Pool({
            connectionString: process.env.DATABASE_URL || CONFIG.dbPath
        });
        this.pool.on('connect', () => {
            console.log('Admin created');
        });
        this.insertAdmin(); 
    }
    async insertAdmin(){
        
        const admin_password = await hasher.hashingPassword('moise123', 10);
        const adminValues = ['moise', 'rwibutso', 'moise@automart.com', 'kigali', admin_password, true];
        const admin =
            `
            INSERT INTO users(
                first_name, 
                last_name, 
                email, 
                address,
                password,  
                is_admin
            )VALUES($1, $2, $3, $4, $5, $6)`
        await this.pool.query(admin, adminValues);

    }
}

new MakeAdmin(); 

