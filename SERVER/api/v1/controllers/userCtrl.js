import userModel from '../models/userModel';
import tokenMan from '../helpers/tokenMan';
import {
    signUpFields,
    loginFields
} from '../helpers/userValidator';
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

        try {

            // Find if email is already taken! 

            const oneMail = await userModel.findMail(req.body.email);
            if (oneMail.rows.length !== 0) {
                return res.status(409).json({
                    status: 409,
                    message: 'Email already taken!'
                })
            }
            const {
                rows
            } = await userModel.create(req.body);

            const token = tokenMan.tokenizer({
                id: rows[0].id,
                is_admin: rows[0].is_admin
            });
            const returnedResponse = {
                status: 201,
                message: 'Successfully Signed Up!',
                userToken: token,
                data: lodash.omit(rows[0], ['password'])
            };
            return res.status(201).json(returnedResponse);

        } catch (err) {
            return res.status(500).json({
                status: 500,
                error: err.message
            })
        }
    },

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

            // Check if email exists.
            const {
                rows
            } = await userModel.findMail(email);

            if (rows.length == 0) {
                return res.status(404).json({
                    status: 404,
                    error: 'User not found!'
                })
            };

            const matcher = await decryptor.isSame(password, rows[0].password);

            if (!matcher) return res.status(401).json({
                status: 401,
                error: 'Invalid Password!'
            });

            const accessToken = tokenMan.tokenizer({
                id: rows[0].id,
                email: rows[0].email,
                is_admin: rows[0].is_admin
            });

            const returnedResponse = {
                status: 200,
                message: 'Successfully Signed In!',
                data: [{
                    accessToken
                }]
            }

            return res.header('Authorization', `Bearer ${accessToken}`).status(200).json(returnedResponse);

        } catch (err) {
            return res.status(500).json({
                status: 500,
                error: err.message
            })
        }
    },

    // Update the user's admin status.

    async updateUser(req, res){

        try{
               
    const {
        id
    } = req.params;


    const uniqueUser = await userModel.findUser(id);

    if(uniqueUser.rows.length === 0) {
        return res.status(404).json({
            status: 404,
            error: `User ${id} not found!`
        })
    }

    const {
        rows
    } = await userModel.updateUser(id, req.body);
    return res.status(200).json({
        status: 200,
        message: 'User successfully updated!',
        data: lodash.omit(rows[0], ['password'])
    })
        }catch(err){
            return res.status(500).json({
                status: 500, 
                error: err.message
            })
        }

    }
}


export default User;