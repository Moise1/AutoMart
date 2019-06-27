import db from "../db/dbIndex"; 
import moment from "moment"; 

class AdModel{

    static async makeAd(req, owner){

        let theMoment = moment(); 
        const created_on = theMoment.format("YYYY-MM-DD"); 
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
        const queryText = "INSERT INTO ads(owner, manufacturer, body_type, model, state, status, price, created_on) VALUES($1, $2, $3, $4, $5, $6,$7, $8) RETURNING*";
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

    static async getData(){
        const queryText = "SELECT * FROM ads"; 
        const queryResult = await db.query(queryText); 
        return queryResult;
    }

    static async specificAd( idValue){
        const queryText = "SELECT * FROM ads  WHERE car_id=$1"; 
        const queryResult = await db.query(queryText, [parseInt(idValue)]);
        return queryResult;
    } 

    static async specificOwner(ownerId){
        const queryText = "SELECT ads.owner FROM ads WHERE owner=$1"; 
        const queryResult = await db.query(queryText, [parseInt(ownerId)]);
        return queryResult;
    } 

    static async theUpdater(anyValue, input){
        const theMoment = moment(); 
        const {
            rows
        } = await this.specificAd(column, table, anyValue);
        const status = input.status;
        const price = input.price;
        const modified_on = theMoment.format("YYYY-MM-DD");
        const queryText = "UPDATE ads SET status=$1, price=$2, modified_on=$3 WHERE car_id=$4 RETURNING*";
        const queryResult = await db.query(queryText, [status, price, modified_on, rows[0].car_id]);
        return queryResult;

    }

    static async removeAd(Idvalue) {
        const {
            rows
        } = await this.specificAd(Idvalue);
        const queryText = "DELETE FROM ads WHERE car_id=$1";
        const queryResult = await db.query(queryText, [rows[0].car_id]);
        return queryResult;
    }
  
    static async carPrice(price){
        const queryText = "SELECT * FROM ads WHERE price=$1"; 
        const queryResult = await db.query(queryText, [price]); 
        return queryResult;
    }
 
    static async theUpdater(id, input){
        const theMoment = moment(); 
        const {
            rows
        } = await this.specificAd(id);
        const status = input.status;
        const price = input.price;
        const modified_on = theMoment.format("YYYY-MM-DD");

        const queryText = "UPDATE ads SET status=$1, price=$2, modified_on=$3 WHERE car_id=$4 RETURNING *";
        const queryResult = await db.query(queryText, [status, price, modified_on, rows[0].car_id]);
        return queryResult;

    }

    static async removeAd(id) {
        const {
            rows
        } = await this.specificAd(id);
        const queryText = "DELETE  FROM ads WHERE car_id=$1";
        const queryResult = await db.query(queryText, [rows[0].car_id]);
        return queryResult;
    }
  
    //  Get a car's status

    static async availableCars(theAvailable){
        const queryText = "SELECT ads.car_id,  users.email AS owner, ads.manufacturer, ads.body_type,  ads.model, ads.state, ads.status, ads.price FROM ads INNER JOIN  users ON ads.owner=users.id  WHERE status=$1"; 
        const queryResult = await db.query(queryText, [theAvailable]); 
        return queryResult; 
    } 

    
    static async priceRange(carStatus, minimum, maximum){
        const queryText = "SELECT ads.car_id,  users.email AS owner, ads.manufacturer, ads.body_type,  ads.model, ads.state, ads.status, ads.price FROM ads INNER JOIN  users ON ads.owner=users.email  WHERE ads.status=$1 AND ads.price >=$2 AND ads.price <=$3"; 
        const queryResult = await db.query(queryText, [carStatus, minimum, maximum]); 
        return queryResult;
    }
}

export default AdModel;