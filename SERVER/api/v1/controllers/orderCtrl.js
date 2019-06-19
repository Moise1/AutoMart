import orderModel from '../models/orderModel';
import orderFields from '../helpers/orderValidator';
import adModel from '../models/adModel';
import userModel from '../models/userModel'; 
import ResponseHandler from '../helpers/theResponse';
import moment from 'moment';
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
            // const columns = '*'; 
            // const table =  'ads'; 
            // const priceValue = 'price';
            // const idValue = 'car_id';


            const owner_email = req.user.email;
            // const theCar = await adModel.specificAd(columns, table, parseInt(idValue));
            // const thePrice = await adModel.carPrice(); 
            // console.log(thePrice); 

            const owner_data = await userModel.findMail(owner_email);

            if (!owner_data.rows.length === 0) {
                return res.status(404).json({
                    status: 404,
                    error: 'User not found!'
                })
            };
            const {
                rows
            } = await orderModel.makeOrder(req.body, owner_data.rows[0].email);


            return res
            .status(201)
            .json(new ResponseHandler(201, rows[0], null, "Purchase Order Successfully Created!").result());
            
            
        } catch (err) {
            return res.status(500).json({
                status: 500,
                error: err.message
            });
        }

    }

    // Buyer update the price of a purchase order when it's still pending.
    static async updateOrder(req, res) {

        let new_price = req.body;
        let m = moment();
        const modified_on = m.format('hh:mm a, DD-MM-YYYY');

        try {
            const findOrder = orders.find(order => order.order_id === parseInt(req.params.order_id));
            if (!findOrder) {
                return res.status(404).json({
                    status: 404,
                    error: `Sorry, order number ${req.params.order_id} not found!`
                })
            };

            if (findOrder.status === 'pending') {

                findOrder.old_price_offered = findOrder.new_price_offered;
                Reflect.ownKeys(new_price).forEach(key => {
                    findOrder.new_price_offered = "$" + new_price[key].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                });
                findOrder.modified_on = modified_on;
                return res.status(200).json({
                    status: 200,
                    message: 'Order\'s  Price Successfully Updated!',
                    data: [lodash.omit(findOrder, ['price_offered'])]
                })
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