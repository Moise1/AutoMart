import orders from '../models/orderModel'; 
import orderFields from '../helpers/orderValidator';
import ads from '../models/adModel'; 
import moment from 'moment';


const Order = {

    // Buyer make a purchase order
    async createOrder(req, res){
        const {
            error
        } = orderFields(req.body);

        if (error) return res.status(400).json({
            status: 400,
            error: error.details[0].message
        });

        const buyer = req.user.id; 
        const findAd = ads.find(ad => ad.car_id === parseInt(req.body.car_id)); 
        let m = moment();
        const created_on = m.format('hh:mm a, DD-MM-YYYY'); 
        const {status, price_offered} = req.body;

        try{

            if(!findAd) {
                return res.status(404).json({
                    status: 404, 
                    error: `Sorry, car number ${req.body.car_id} not found!`
                });
            }; 

            const newOrder = {
                order_id: orders.length + 1,
                buyer: buyer, 
                car_id: findAd.car_id,
                price: findAd.price, 
                price_offered: "$" + price_offered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), 
                status: status,
                created_on: created_on
            };

            orders.push(newOrder); 
            return res.status(201).json({
                status: 201, 
                message: 'Purchase Order Successfully Created!', 
                data: orders
            });

        }catch(err){
            return res.status(500).json({
                status: 500, 
                error: err.message
            });
        }
        
    }, 

    // Buyer update the price of a purchase order when it's still pending.

    async updateOrder(req, res){

        let m = moment();
        const modified_on = m.format('hh:mm a, DD-MM-YYYY'); 
       
        try{
            const findOrder = orders.find(order => order.order_id === parseInt(req.params.order_id));
            const new_price = req.body;

            if(!findOrder){
                return res.status(404).json({
                    status: 404, 
                    error: `Sorry, order number ${req.params.order_id} not found!`
                })
            }; 

            if(findOrder.status === 'pending'){

                findOrder.old_price_offered = findOrder.price_offered;
                Reflect.ownKeys(new_price).forEach(key =>{
                    findOrder.new_price_offered = "$" + new_price[key].replace(/\B(?=(\d{3})+(?!\d))/g, ",") ;
                }); 

                findOrder.modified_on = modified_on;

                return res.status(200).json({
                    status: 200, 
                    message: 'Order\'s  Price Successfully Updated!', 
                    data: [findOrder]
                })
            }else{
                return res.status(400).json({
                    status: 400, 
                    error:'Sorry, order already processed. It can\'t be modified now.'
                })
            }

        }catch(err){
            return res.status(500).json({
                status: 500, 
                error: err.message
            });
        };
    }
}

export default Order;