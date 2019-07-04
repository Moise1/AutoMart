import express from "express";
import {
    Router,
    json
} from "express";
import User from "../controllers/userCtrl";
import {tokenExists, userAccess, adminAccess} from "../middleware/userToken";


const userRouter = express.Router();

userRouter.use(json());

userRouter.post("/api/v1/auth/signup", User.userSignUp);
userRouter.post("/api/v1/auth/signin", User.userSignIn);
userRouter.patch("/api/v1/users/:id", tokenExists, userAccess, adminAccess, User.updateUser);


export default userRouter;