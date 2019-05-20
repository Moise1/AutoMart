import dotenv from 'dotenv'; 

dotenv.config(); 

let CONFIG = {}; 

CONFIG.adminPwd = process.env.ADMIN_PWD  || 'admin';
CONFIG.secretKey = process.env.SECRET_KEY || 'secret';

module.exports  = CONFIG;