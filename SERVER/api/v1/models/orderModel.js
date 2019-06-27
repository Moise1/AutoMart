import db from "../db/dbIndex"; 
import moment from "moment"; 

class OrderModel{

    static async makeOrder(req, buyer){

        let theMoment = moment(); 
        const created_on = theMoment.format("YYYY-MM-DD"); 
        const {
            car_id,
            price_offered,
            status
        } = req;

        const newOrder = {
            buyer: buyer,
            car_id: car_id,
            price_offered: price_offered,
            status: status,
        };
        const queryText = "INSERT INTO orders(buyer, car_id, price_offered, status, created_on) VALUES($1, $2, $3, $4, $5) RETURNING*";
        const values = [
            newOrder.buyer,
            newOrder.car_id,  
            newOrder.price_offered, 
            newOrder.status,  
            created_on
        ]; 

        const queryResult = await db.query(queryText, values); 
        return queryResult;

    }

    static async findOrder(id){
        const queryText = "SELECT * FROM orders WHERE order_id=$1";
        const queryResult = await db.query(queryText, [parseInt(id)]);
        return queryResult;

    }

    static async theUpdater(id, input){
        const theMoment = moment();
        const {
            rows
        } = await this.findOrder(id);
        const new_price_offered = input.new_price_offered;
        const modified_on = theMoment.format("YYYY-MM-DD");

        const queryText = "UPDATE orders SET new_price_offered=$1, modified_on=$2 WHERE order_id=$3 RETURNING *";
        const queryResult = await db.query(queryText, [new_price_offered, modified_on, rows[0].order_id]);
        return queryResult;
    }

   
}

export default OrderModel;