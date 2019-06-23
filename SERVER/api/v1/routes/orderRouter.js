import express from "express";
import {
    Router,
    json
} from "express";
import Order from "../controllers/orderCtrl";
import {
    tokenExists,
    userAccess,
    adminAccess
} from "../middleware/userToken";


const orderRouter = express.Router();

orderRouter.use(json());

orderRouter.post("/api/v1/order", tokenExists, userAccess, Order.createOrder);
orderRouter.patch("/api/v1/order/:order_id/price", tokenExists, userAccess, Order.updateOrder);

export default orderRouter; 