import express from "express";
import {
    Router,
    json
} from "express";
import Flag from "../controllers/flagCtrl";

import {
    tokenExists,
    userAccess,
    adminAccess,
} from "../middleware/userToken";


const flagRouter = express.Router();

flagRouter.use(json());

flagRouter.post("/api/v1/flag", tokenExists, userAccess, Flag.createFlag);



export default flagRouter;