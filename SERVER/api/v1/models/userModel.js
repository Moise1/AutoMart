import hasher from '../helpers/password';
import CONFIG from '../config/config'
import tokenMan from '../helpers/tokenMan';

const adminPassword = async () =>{ 
    const hashedPassword = await hasher.hashingPassword(CONFIG.adminPwd, 10); 
    return hashedPassword;
};

const id = 1; 
const is_admin = true;
const is_buyer = false;
const is_seller = false;

const email = 'john@gmail.com';
const token = tokenMan.tokenizer({id ,is_admin, is_seller, is_buyer}); 

const  result = adminPassword().then(pwd =>{
    return {
        token: token,
        id: id, 
        first_name: 'john', 
        last_name: 'doe', 
        email: email,
        address: 'Lagos',
        password: pwd, 
        is_admin: is_admin,
        is_seller: is_seller, 
        is_buyer: is_buyer
    }
}).then(res =>{
    return res;
}).catch(err =>{
    throw err;
})


export default [result];
