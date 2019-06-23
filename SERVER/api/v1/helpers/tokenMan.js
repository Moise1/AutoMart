import jwt from "jsonwebtoken"; 
import keys from "../config/config"; 


export default {
    tokenizer(payload){
        const token = jwt.sign(payload, keys.SECRET_OR_PUBLIC_KEY, {
            expiresIn: "30d"
        }); 
        return token;
    },

};

