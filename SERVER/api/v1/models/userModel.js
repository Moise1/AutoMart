import hasher from '../helpers/password';
import CONFIG from '../config/config'
import tokenMan from '../helpers/tokenMan';



const adminPassword = async()=>{
    const hash = await hasher.hashingPassword(CONFIG.adminPwd, 10); 
    return hash;
}
let id = 1 ; 
let is_admin = true;
let is_buyer = false;
let is_seller = false;
let email = 'john@gmail.com';
let token = tokenMan.tokenizer({id ,is_admin, is_seller, is_buyer}); 

let admin = adminPassword().then(pwd =>{
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
        throw err.message;
    });
    
export default [admin];