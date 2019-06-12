import users from '../models/userModel';
import tokenMan from '../helpers/tokenMan';
import {
    signUpFields,
    loginFields
} from '../helpers/userValidator';
import hasher from '../helpers/password';
import decryptor from '../helpers/password';
import lodash from 'lodash';


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
            address
        } = req.body

        const hashed_password = await hasher.hashingPassword(password, 10);

        try {

            const newUser = {
                token: tokenMan.tokenizer({
                    id,
                    is_admin,
                }),
                id: id,
                first_name: first_name,
                last_name: last_name,
                email: email.toLowerCase(),
                password: hashed_password,
                address: address,
                is_admin: is_admin,
            }
            
            // Check whether the email is already taken. 
    
            if(users.some(us => us.email === email)) return res.status(400).json({
                status: 400, 
                error: 'Sorry! Email already taken.'
            }) 
            users.push(newUser);

            Promise.all(users).then(async values => {
                return res.status(201).json({
                    status: 201,
                    message: 'Successfully Signed Up!',
                    data: lodash.omit(values[values.length -1], ['password'])
                })
            });

        } catch (err) {
            return res.status(500).json({
                status: 500,
                error: err.message
            })
        }
    },

    // User Sign In
    async userSignIn(req, res) {
        const {
            error
        } = loginFields(req.body);

        if (error) return res.status(400).json({
            status: 400,
            error: error.details[0].message
        });

        try {
            const {
                email,
                password
            } = req.body;


            Promise.all(users).then( async values => {
                const userFinder = values.find(user => user.email === email);

                if (!userFinder) {
                    return res.status(404).json({
                        status: 404,
                        error: `User with email ${email} is not found!`
                    })  
                };
                const matched = await decryptor.isSame(password, userFinder.password);
                if (!matched) {
                    return res.status(401).json({
                        status: 401,
                        error: 'Invalid Password'
                    })
                }

                const token = await tokenMan.tokenizer({
                    id: userFinder.id,
                    email: userFinder.email,
                    is_admin: userFinder.is_admin,
                });
                return res.header('Authorization', `Bearer ${token}`).status(200).json({
                    status: 200,
                    message: 'Successfully Signed In!',
                    data: lodash.omit(userFinder, ['password'])
                });

            });

        } catch (err) {
            return res.status(500).json({
                status: 500,
                error: err.message
            })
        }
    }, 

    // Set user's admin status to true 

    async updateUser(req, res){

        const findUser = users.find(user => user.id === parseInt(req.params.id));
        try{
                if(!findUser) return res.status(404).json({
                    status: 404, 
                    error: `User number ${req.params.id} not found!`
                }); 
                
                findUser.is_admin = Boolean(req.body.is_admin === 'true');  

                return res.status(200).json({
                    status: 200, 
                    message: `User number ${req.params.id} successfully updated!`,
                    data: lodash.omit(findUser, ['password'])
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