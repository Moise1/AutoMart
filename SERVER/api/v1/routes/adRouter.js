import express from 'express';
import {
    Router,
    json
} from 'express';
import Ad from '../controllers/adCtrl';

import {
    tokenExists,
    userAccess,
    adminAccess,
    
} from '../middleware/userToken';

const {
    createAd,
    getAllCars,
    getOneAd,
    updateStatus,
    updatePrice,
    deleteAd
} = Ad;

const adRouter = express.Router();

adRouter.use(json());

adRouter.post('/api/v1/car', tokenExists, userAccess, createAd);
adRouter.get('/api/v1/car', tokenExists, userAccess, getAllCars);
adRouter.get('/api/v1/car/:car_id', tokenExists, userAccess, getOneAd);
adRouter.patch('/api/v1/car/:car_id/status', tokenExists, userAccess, updateStatus);
adRouter.patch('/api/v1/car/:car_id/price', tokenExists, userAccess, updatePrice);
adRouter.delete('/api/v1/car/:car_id', tokenExists, userAccess, adminAccess, deleteAd);


export default adRouter;