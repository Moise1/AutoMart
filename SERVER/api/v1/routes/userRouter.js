import express from 'express';
import {
    Router,
    json
} from 'express';
import User from '../controllers/userCtrl'
import {tokenExists, userAccess, adminAccess} from '../middleware/userToken';

const {
    userSignUp,
    userSignIn, 
    updateUser
} = User;

const userRouter = express.Router();

userRouter.use(json());

userRouter.post('/api/v1/auth/signup', userSignUp);
userRouter.post('/api/v1/auth/signin', userSignIn);
userRouter.patch('/api/v1/users/:id', tokenExists, userAccess, adminAccess, updateUser);



export default userRouter;