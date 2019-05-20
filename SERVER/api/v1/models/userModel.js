
import hasher from '../helpers/password';
import CONFIG from '../config/config'
import tokenMan from '../helpers/tokenMan';
import lodash from 'lodash';

const adminPassword = async () =>{ 
    const hashedPassword = await hasher.hashingPassword(CONFIG.adminPwd, 10); 
    return hashedPassword;
};

const id = 1; 
const is_admin = true;
const email = 'john@gmail.com';
const token = tokenMan.tokenizer({id,email, is_admin}); 

const  result = adminPassword().then(pwd =>{
    return {
        token: token,
        id: id, 
        first_name: 'john', 
        last_name: 'doe', 
        email: email,
        address: 'Lagos',
        password: pwd, 
        is_admin: is_admin
    }
}).then(res =>{
    return lodash.omit(res, ["password"]);
}).catch(err =>{
    throw err;
})


export default [result];
