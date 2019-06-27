import db from "../db/dbIndex"; 
import moment from "moment"; 
class FlagModel{

    static async createFlag(req){
        const {reason, description, car_id} = req; 
        const theMoment = moment(); 
        const created_on = theMoment.format("YYYY-MM-DD"); 

        const newFlag = {
            car_id: car_id, 
            reason: reason, 
            description: description, 
        };

        const values = [
            newFlag.car_id, 
            newFlag.reason, 
            newFlag.description, 
            created_on
        ];

        const queryText = "INSERT INTO flags(car_id, reason, description, created_on) VALUES($1, $2, $3, $4) RETURNING*"; 
        const queryResult = await db.query(queryText, values); 
        return queryResult; 
    }

    static async getAllFlags(){
        const queryText = "SELECT * FROM flags"; 
        const queryResult = await db.query(queryText); 
        return queryResult; 
    } 

    static async specificFraud(idValue){
        const queryText = "SELECT * FROM flags WHERE flags.car_id=$1"; 
        const queryResult = await db.query(queryText, [parseInt(idValue)]); 
        return queryResult; 
    } 

    
}

export default FlagModel; 