import db from '../db/dbIndex'; 
import moment from 'moment'; 

class CarSaleAd{
    async makeAd(req, owner){

        let theMoment = moment(); 
        const created_on = theMoment.format('YYYY-MM-DD'); 
        const {
            manufacturer,
            body_type,
            model,
            state,
            price,
            status
        } = req;

        const newAd = {
            owner: owner,
            manufacturer: manufacturer,
            body_type: body_type,
            model: model,
            state: state,
            status: status || "available",
            price: parseFloat(price)
        };
        const queryText = 'INSERT INTO ads(owner, manufacturer, body_type, model, state, status, price, created_on) VALUES($1, $2, $3, $4, $5, $6,$7, $8) RETURNING*';
        const values = [
            newAd.owner, 
            newAd.manufacturer, 
            newAd.body_type, 
            newAd.model, 
            newAd.state, 
            newAd.status, 
            newAd.price, 
            created_on
        ]; 

        const queryResult = await db.query(queryText, values); 
        return queryResult;

    }
}

export default new CarSaleAd;