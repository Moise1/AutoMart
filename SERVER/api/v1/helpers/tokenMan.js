import jwt from 'jsonwebtoken'; 
import CONFIG from '../config/config'; 


export default {
    tokenizer(payload){
        const token = jwt.sign(payload, CONFIG.secretOrPublicKey, {
            expiresIn: '365d'
        }); 
        return token;
    },

}

