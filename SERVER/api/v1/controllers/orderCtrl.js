import orderModel from '../models/orderModel';
import orderFields from '../helpers/orderValidator';
import adModel from '../models/adModel';
import userModel from '../models/userModel'; 
import ResponseHandler from '../helpers/theResponse';
import lodash from 'lodash';


class Order{
    // Buyer make a purchase order

    static async createOrder(req, res) {
        const {
            error
        } = orderFields(req.body);

        if (error) return res.status(400).json({
            status: 400,
            error: error.details[0].message
        });

        try {
            const columns = '*'; 
            const table =  'ads'; 
            const owner_email = req.user.email;
            const {car_id} = req.body; 
            const theCar = await adModel.specificAd(columns, table, parseInt(car_id));
            const owner_data = await userModel.findMail(owner_email);

            if (owner_data.rows.length === 0) {
                return res.status(404).json({
                    status: 404,
                    error: 'User not found!'
                })
            };

            if (theCar.rows.length === 0) {
                return res.status(404).json({
                    status: 404,
                    error:  `Car number ${car_id} not found!`
                })
            };
            const {
                rows
            } = await orderModel.makeOrder(req.body, owner_data.rows[0].email, theCar.rows[0].car_id);


            return res
            .status(201)
            .json(new ResponseHandler(201, lodash.omit(rows[0], ['new_price_offered', 'modified_on']), null, "Purchase Order Successfully Created!").result());
            
            
        } catch (err) {
            return res.status(500).json({
                status: 500,
                error: err.message
            });
        }

    }

    // Buyer update the price of a purchase order when it's still pending.
    static async updateOrder(req, res) {

        try {
            
            const {order_id} = req.params; 
            const theOrder = await orderModel.findOrder(parseInt(order_id)); 

            if(theOrder.rows.length === 0){
                return res.status(404).json({
                    status: 404, 
                    error: `Order number ${order_id} not found!`
                })
            }
            if (theOrder.rows[0].status === 'pending') {

                const {rows} = await orderModel.theUpdater(order_id, req.body); 
                return res
                .status(200)
                .json(new ResponseHandler(200, lodash.omit(rows[0], ['price_offered']), null, 'Order\'s  Price Successfully Updated!').result());
            } else {
                return res.status(400).json({
                    status: 400,
                    error: 'Sorry, order already processed. It can\'t be modified now.'
                })
            }

        } catch (err) {
            return res.status(500).json({
                status: 500,
                error: err.message
            });
        };
    }
}

export default Order;