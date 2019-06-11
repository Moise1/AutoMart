import express from 'express';
import {
    Router,
    json
} from 'express';
import Order from '../controllers/orderCtrl';
import {
    tokenExists,
    userAccess,
    adminAccess
} from '../middleware/userToken';

const {
    createOrder, 
    updateOrder
} = Order;


const orderRouter = express.Router();

orderRouter.use(json());

orderRouter.post('/api/v1/order', tokenExists, userAccess, createOrder)
orderRouter.patch('/api/v1/order/:order_id/price', tokenExists, userAccess, updateOrder)

export default orderRouter; 