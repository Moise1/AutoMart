import FlagModel from "../models/flagModel";
import flagFields from "../helpers/flagValidator";
import AdModel from "../models/adModel";
import ResponseHandler from "../helpers/theResponse";


class Flag {

    static async createFlag(req, res) {
        const {
            error
        } = flagFields(req.body);

        if (error) return res
            .status(400)
            .json(new ResponseHandler(400, null, error.details[0].message).result());

        const {
            car_id
        } = req.body;

        const theCar = await AdModel.specificAd(parseInt(car_id)); 

        try {

            if (theCar.rows.length === 0) return res
                    .status(404)
                    .json(new ResponseHandler(404, null, `Sorry, car number ${req.body.car_id} not found!`).result());
            

            const theFraud = await FlagModel.specificFraud(theCar.rows[0].car_id);

            if (theFraud.rows.length !== 0) return res
                    .status(409)
                    .json(new ResponseHandler(409, null, `Sorry! This car number ${req.body.car_id} is already flagged!`).result());
            

            const {
                rows
            } = await FlagModel.createFlag(req.body);


            return res.status(201).json(new ResponseHandler(201, rows[0], null, "Fraud Report Created!").result());

        } catch (error) {
            return res
                .status(500)
                .json(new ResponseHandler(500, error.message, null));
        }
    }
}



export default Flag;