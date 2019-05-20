import express from 'express';
import {
    Router,
    json
} from 'express';
import User from '../controllers/userCtrl'

const {
    userSignUp,
    userSignIn
} = User;

const userRouter = express.Router();

userRouter.use(json());

userRouter.post('/api/v1/auth/signup', userSignUp);
userRouter.post('/api/v1/auth/signin', userSignIn);



export default userRouter;