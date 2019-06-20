import db from './dbIndex';
import hasher from '../helpers/password';

        
hasher.hashingPassword('moise123', 10).then( async admin_password=>{
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
         await db.query(admin, adminValues);
});
        

