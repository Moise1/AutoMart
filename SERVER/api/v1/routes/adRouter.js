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

const adRouter = express.Router();

adRouter.use(json());

adRouter.post('/api/v1/car', tokenExists, userAccess, Ad.createAd);
adRouter.get('/api/v1/car', tokenExists, userAccess, Ad.getAllCars);
adRouter.get('/api/v1/car/:car_id', tokenExists, userAccess, Ad.getOneAd);
adRouter.patch('/api/v1/car/:car_id', tokenExists, userAccess, Ad.updateCarAd);
adRouter.delete('/api/v1/car/:car_id', tokenExists, userAccess, adminAccess, Ad.deleteAd);


export default adRouter;