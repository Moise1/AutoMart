import express from 'express';
import {
    Router,
    json
} from 'express';
import Ad from '../controllers/adCtrl';
import {
    tokenExists,
    userAccess,
    sellerAccess,
    buyerAccess,
    adminAccess
} from '../middleware/userToken';

const {
    createAd, 
    updateAd, 
    getOneAd
} = Ad;


const adRouter = express.Router();

adRouter.use(json());

adRouter.post('/api/v1/car', tokenExists, userAccess, sellerAccess ,createAd);
adRouter.get('/api/v1/car/:car_id', tokenExists, userAccess, sellerAccess, getOneAd);
adRouter.patch('/api/v1/car/:car_id/status', tokenExists, userAccess, sellerAccess, updateAd);
adRouter.patch('/api/v1/car/:car_id/price', tokenExists, userAccess, sellerAccess, updateAd);





export default adRouter;