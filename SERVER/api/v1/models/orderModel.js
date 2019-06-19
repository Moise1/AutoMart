import db from '../db/dbIndex'; 
import moment from 'moment'; 

class PurchaseOrder{

    async makeOrder(req, buyer){

        let theMoment = moment(); 
        const created_on = theMoment.format('YYYY-MM-DD'); 
        const {
            car_id,
            price_offered,
            status
        } = req;

        const newOrder = {
            buyer: buyer,
            price_offered: price_offered,
            status: status,
        };
        const queryText = 'INSERT INTO orders(buyer, price_offered, status, created_on) VALUES($1, $2, $3, $4) RETURNING*';
        const values = [
            newOrder.buyer,  
            newOrder.price_offered, 
            newOrder.status,  
            created_on
        ]; 

        const queryResult = await db.query(queryText, values); 
        return queryResult;

    }

   
}

export default new PurchaseOrder;