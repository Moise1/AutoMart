import dotenv from 'dotenv'; 

dotenv.config(); 

let CONFIG = {}; 

CONFIG.secretOrPublicKey= process.env.SECRET_OR_PUBLIC_KEY || 'secret';
CONFIG.dbPassword = process.env.DB_PASSWORD || 'myshop';
CONFIG.dbPath = process.env.DB_PATH;

module.exports  = CONFIG;