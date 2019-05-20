import lodash from 'lodash';
import users from '../models/userModel';
import tokenMan from '../helpers/tokenMan'; 
import { signUpFields, loginFields } from '../helpers/userValidator';
import hasher from '../helpers/password'; 
import decryptor from '../helpers/password';


const User = {

    // User Sign Up
    async userSignUp(req, res) {

        const {
            error
        } = signUpFields(req.body);

        if (error) return res.status(400).json({
            status: 400,
            error: error.details[0].message
        });
        
        const id = users.length + 1;
        const is_admin = false;
        const {
            first_name,
            last_name,
            email,
            password,
            address,
        } = req.body

        const hashed_password = await hasher.hashingPassword(password, 10);

        const newUser = {
            token: tokenMan.tokenizer({id, email, is_admin}),
            id: id,
            email: email,
            first_name: first_name,
            last_name: last_name,
            password: hashed_password,
            address: address,
            is_admin: is_admin,
        }
        try {
            users.push(lodash.omit(newUser, ["password"]));
            Promise.all(users).then(values =>{
            res.status(201).json({
                status: 201,
                message: 'Successfully Signed Up',
                data: values
            })
            }).catch(err =>{
                throw err;
            }); 
            
        } catch (err) {
            res.status(500).json({
                status: 500,
                error: err
            })
        }
    }, 

    // User Sign In
    async userSignIn(req, res){
        const {
            error
        } = loginFields(req.body);

        if (error) return res.status(400).json({
            status: 400,
            error: error.details[0].message
        });

        try{
        const { email, password } = req.body; 

        const userFinder = users.find(user => user.email === email); 

        if(!userFinder) {
            return res.status(404).json({
                status: 404, 
                error: 'User not found!'
            })
        };
            const matcher = await decryptor.isSame(password, userFinder.password); 
            if(!matcher){
                return res.status(401).json({
                    status: 401, 
                    error: 'Invalid Password'
                })
            }

        const token = tokenMan.tokenizer({
            id: userFinder.id, 
            email: userFinder.email, 
            is_admin: userFinder.is_admin
        });

        return res.header('Authorization', `Bearer ${token}`).status(200).json({
                status: 200, 
                message: 'Successfully Signed In!', 
                data: [userFinder]
            }); 
        }catch(err){
            throw err;
        }
    }
}


export default User;