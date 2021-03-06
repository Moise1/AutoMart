import AdModel from "../models/adModel";
import UserModel from "../models/userModel";
import adFields from "../helpers/adValidator";
import ResponseHandler from "../helpers/theResponse"; 
import lodash from "lodash";


class Ad {

    // Create a new car/car ad. 
    static async createAd(req, res) {

        const {
            error
        } = adFields(req.body);


        if(error) return res 
        .status(400) 
        .json(new ResponseHandler(400,  error.details[0].message, null).result());
        
        try {

            const owner_id = req.user.id;

            const owner_data = await UserModel.findUser(owner_id);

            if(!owner_data.rows.length === 0) return res
            .status(404)
            .json(new ResponseHandler(404, null, error, "User not found!").result());

            const {
                rows
            } = await AdModel.makeAd(req.body, owner_data.rows[0].id);

            return res
            .status(201)
            .json(new ResponseHandler(201,  lodash.omit(rows[0], ["modified_on"]) , null, "Car sale successfully created!").result());
            
        } catch (err) {
            return res.status(500).json({
                status: 500,
                err: err.message
            });
        }

    }

    // User get all unsold cars. 
    static async getAllCars(req, res, next) {

        try {

    
            const {rows} = await AdModel.getData();  
            const thePrice = rows;

            if (req.query.status === "available" && req.query.min_price >= thePrice && req.query.max_price <= thePrice) {  

                // Available cars within a certain range. 
              
                const {status, min_price, max_price} = req.query;

                const {inRange} = await AdModel.priceRange(status, min_price, max_price);   
          
                if (!theAVailable[0]) {
                    return res.status(404).json(new ResponseHandler(404,  null, error, "No cars in that price range!"));
                }
                return res.status(200).json(new ResponseHandler(200, inRange, null, "Cars within that price range").result());
            }

            if (req.query.status === "available") {

                // cars with just "available" status.
                const {status} = req.query;
               const {rows}= await AdModel.availableCars(status); 
               const justAvailable = rows;


               if(!justAvailable) return res
               .status(404)
               .json(new ResponseHandler(404, error, null, "No cars left in store").result());


                return res.status(200).json({
                    status: 200,
                    message: "Here are all available cars",
                    data: justAvailable

                });
            }

            if(req.user.is_admin === true){

                const columns = "*";
                const tableName = "ads";
                const {rows} = await AdModel.getData(columns, tableName); 
                return res
                .status(200)
                .json(new ResponseHandler(200, rows, null, "Here are all the cars!").result());
            }

            return res.status(404).json(new ResponseHandler(404, null, "Sorry! No results could match your search.").result());

        } catch (err) {
            return res
            .status(500)
            .json(new ResponseHandler(500, err, null, err.message).result());
        }

    }

    
    // Seller get a single car/car ad. 
    static async getOneAd(req, res) {

        try {
            const {car_id} = req.params; 
            const {rows} = await AdModel.specificAd(parseInt(car_id)); 
            if (rows.length === 0) {
                return res.status(404).json({
                    status: 404,
                    error: `Car sale ad number ${car_id} is not found!`
                });
            }

            return res
            .status(200) 
            .json(new ResponseHandler(200, lodash.omit(rows[0], ["modified_on"]) , null, "Congs, here's your result!").result());
 

        } catch (err) {
            return res.status(500).json({
                status: 500,
                error: err.message
            });
        }
    }

    // Seller update the status or price of the car/car ad.

    static async updateCarAd(req, res) {

        const {car_id} = req.params; 
        
        try {
            
            const owner_id = req.user.id;
            const user_data = await UserModel.findUser(owner_id);
            const theCar = await AdModel.specificAd(car_id);  
            const theOwner = await AdModel.specificOwner(user_data.rows[0].id);
            
            if(theCar.rows.length === 0){
                return res
                .status(404)
                .json(new ResponseHandler(404, null,  `Car sale ad number ${car_id} is not found!`).result());
            }


            if(theOwner.rows.length === 0) return res 
            .status(401) 
            .json(new ResponseHandler(401, null, "Sorry! You can only edit the ads you posted.").result());

            const {
                rows
            } = await AdModel.theUpdater(car_id, req.body);

            return res 
            .status(200) 
            .json(new ResponseHandler(200, rows[0], null,  "The Ad's  successfully updated!").result());
           
        } catch (err) {
            return res.status(500).json({
                status:500,
                error: err.message
            });
        }
    }

    static async deleteAd(req, res) {

        const {
            car_id
        } = req.params; 


        try {
            
            const {
                rows
            } = await AdModel.specificAd(parseInt(car_id));

            if (rows.length === 0) {
                return res.status(404).json({
                    status: 404,
                    error: `Car sale ad number ${car_id} is not found!`
                });
            }
            await AdModel.removeAd(car_id);

            return res 
            .status(200)
            .json(new ResponseHandler(200, `Car sale ad number ${car_id} successfully deleted!`).result());
            
        } catch (err) {
            return res.status(500).json({
                status: 500,
                error: err.message
            });
        }

    }
}

export default Ad;