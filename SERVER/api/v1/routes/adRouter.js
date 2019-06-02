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
    adminAccess,
    buyerAccess
} from '../middleware/userToken';

const {
    createAd,
    getAllCars,
    getOneAd,
    updateAd,
    deleteAd
} = Ad;

const adRouter = express.Router();

adRouter.use(json());

adRouter.post('/api/v1/car', tokenExists, userAccess, sellerAccess ,createAd);
adRouter.get('/api/v1/car', tokenExists, userAccess, getAllCars);
adRouter.get('/api/v1/car/:car_id', tokenExists, userAccess, sellerAccess, getOneAd);
adRouter.patch('/api/v1/car/:car_id/status', tokenExists, userAccess, sellerAccess, updateAd);
adRouter.patch('/api/v1/car/:car_id/price', tokenExists, userAccess, sellerAccess, updateAd);
adRouter.delete('/api/v1/car/:car_id', tokenExists, userAccess, adminAccess, deleteAd);


export default adRouter;