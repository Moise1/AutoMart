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
            is_seller, 
            is_buyer
        } = req.body

        const hashed_password = await hasher.hashingPassword(password, 10);

        const newUser = {
            token: tokenMan.tokenizer({id, is_admin, is_seller, is_buyer}),
            id: id,
            email: email,
            first_name: first_name,
            last_name: last_name,
            password: hashed_password,
            address: address,
            is_admin: is_admin,
            is_buyer: Boolean(is_buyer == "true"),
            is_seller: Boolean(is_seller == "true"),
        }
        try {
            users.push(newUser);
            Promise.all(users).then(values =>{
            return res.status(201).json({
                status: 201,
                message: 'Successfully Signed Up',
                data: values
            })
            }).catch(err =>{
                throw err.message;
            }); 
            
        } catch (err) {
            return res.status(500).json({
                status: 500, 
                error: err.message
            })
        }
    }, 

    // User Sign In
    async userSignIn(req, res){
        const {
            error
        } = loginFields(req.body);

        if(error) return res.status(400).json({
            status: 400,
            error: error.details[0].message
        });

        try{
        const { email, password } = req.body; 

        const userFinder = users.find(user => user.email === email); 

        if(!userFinder) {
            return res.status(404).json({
                status: 404, 
                error: `User with email ${email} is not found!`
            })
        };
            const matched= await decryptor.isSame(password, userFinder.password); 
            if(!matched){
                return res.status(401).json({
                    status: 401, 
                    error: 'Invalid Password'
                })
            }

        const token = tokenMan.tokenizer({
            id: userFinder.id, 
            email: userFinder.email,
            is_admin: userFinder.is_admin,
            is_seller: userFinder.is_seller, 
            is_buyer: userFinder.is_buyer
        });
        return res.header('Authorization', `Bearer ${token}`).status(200).json({
                status: 200, 
                message: 'Successfully Signed In!', 
                data: [userFinder]
            }); 
        }catch(err){
            return res.status(500).json({
                status: 500, 
                error: err.message
            })
        }
    }
}


export default User;