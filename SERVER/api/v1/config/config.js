import dotenv from 'dotenv'; 

dotenv.config(); 

let CONFIG = {}; 

CONFIG.adminPwd = process.env.ADMIN_PWD  || 'admin';
CONFIG.secretOrPublicKey= process.env.SECRET_OR_PUBLIC_KEY || 'secret';

module.exports  = CONFIG;