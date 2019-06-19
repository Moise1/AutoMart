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

    async getData(dataInQuery, tableName){
        const queryText = `SELECT ${dataInQuery} FROM ${tableName}`; 
        const queryResult = await db.query(queryText) 
        return queryResult;
    }

    async specificAd(dataInQuery, tableName, Idvalue){
        const queryText = `SELECT ${dataInQuery} FROM ${tableName} WHERE car_id=$1`; 
        const queryResult = await db.query(queryText, [Idvalue]) 
        return queryResult;
    }

    async carPrice(price){
        const queryText = 'SELECT * FROM ads WHERE price=$1'; 
        const queryResult = await db.query(queryText, [price]) 
        return queryResult;
    }

   
    //  Get a car's status
    async availableCars(theAvailable){
        const queryText = 'SELECT ads.car_id,  users.email AS owner, ads.manufacturer, ads.body_type,  ads.model, ads.state, ads.status, ads.price FROM ads INNER JOIN  users ON ads.owner=users.email  WHERE ads.status=$1'; 
        const queryResult = await db.query(queryText, [theAvailable]); 
        return queryResult; 
    } 

    
    async priceRange(carStatus, minimum, maximum){
        const queryText = 'SELECT ads.car_id,  users.email AS owner, ads.manufacturer, ads.body_type,  ads.model, ads.state, ads.status, ads.price FROM ads INNER JOIN  users ON ads.owner=users.email  WHERE ads.status=$1 AND ads.price >=$2 AND ads.price <=$3'; 
        const queryResult = await db.query(queryText, [carStatus, minimum, maximum]); 
        return queryResult;
    }
}

export default new CarSaleAd;