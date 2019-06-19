import adModel from '../models/adModel';
import userModel from '../models/userModel';
import adFields from '../helpers/adValidator';
import moment from 'moment';
import { Cookie } from 'cookiejar';

class Ad {

    // Create a new car/car ad. 
    static async createAd(req, res) {
        const {
            error
        } = adFields(req.body);

        if (error) return res.status(400).json({
            status: 400,
            error: error.details[0].message
        });


        try {

            const owner_email = req.user.email;

            const owner_data = await userModel.findMail(owner_email);

            if (!owner_data.rows.length === 0) {
                return res.status(404).json({
                    status: 404,
                    error: 'User not found!'
                })
            };
            const {
                rows
            } = await adModel.makeAd(req.body, owner_data.rows[0].email);


            return res.status(201).json({
                status: 201,
                message: 'Car sale ad successfully created!',
                data: rows[0]
            });


        } catch (err) {
            return res.status(500).json({
                status: 500,
                err: err.message
            })
        }

    }

    // User get all unsold cars. 
    static async getAllCars(req, res, next) {

        try {

            const columns = 'ads.price'; 
            const tableName = 'ads'
            const {rows} = await adModel.getData( columns, tableName);  
            const thePrice = rows;

            if (req.query.status === 'available' && req.query.min_price >= thePrice && req.query.max_price <= thePrice) {

                // Available cars within a certain range. 
                const {status, min_price, max_price} = req.query;

                // console.log('The Range:', inSomeRange); 
                const {inRange} = await adModel.priceRange(status, min_price, max_price);   


                if (!theAVailable[0]) {
                    return res.status(404).json({
                        status: 404,
                        error: 'No cars in that price range!'
                    })
                }
                return res.status(200).json({
                    staus: 200,
                    message: 'Cars within that price range',
                    data: inRange
                });
            };

            if (req.query.status === "available") {

                // cars with just "available" status.
                const {status} = req.query;
               const {rows}= await adModel.availableCars(status); 
               const justAvailable = rows;
                return res.status(200).json({
                    status: 200,
                    message: 'Here are all available cars',
                    data: justAvailable

                });
            };

            if(req.user.is_admin === true){
                const columns = '*';
                const tableName = 'ads';
                const {rows} = await adModel.getData(columns, tableName); 
                const  allTheCars = rows;
                return res.status(200).json({
                    status: 200,
                    message: 'Here are all the cars!',
                    data: allTheCars
                })
            }

            return res.status(403).json({
                status: 403,
                error: 'Sorry! Only admin authorized.'
            });

        } catch (err) {
            return res.status(500).json({
                status: 500,
                error: err.message
            })
        }

    }

    // Seller get a single car/car ad. 

    static async getOneAd(req, res) {

        try {

            const {car_id} = req.params; 
            const columns = '*';
            const table = 'ads';
            const {rows} = await adModel.getData(columns, table , parseInt(car_id)); 
            const theCar = rows; 
            if (theCar.length === 0) {
                return res.status(404).json({
                    status: 404,
                    error: `Car sale ad number ${car_id} is not found!`
                })
            };
            return res.status(200).json({
                status: 200,
                message: 'Congs, here\'s your result!',
                data: theCar[0]
            })

        } catch (err) {
            return res.status(500).json({
                status: 500,
                error: err.message
            });
        }
    }

    // Seller update the status or price of the car/car ad.

    static async updateCarAd(req, res) {


        try {

            const {
                car_id
            } = req.params;
            const theCar = await adModel.specificAd(parseInt(car_id));

            if (theCar.rows.length === 0) {
                return res.status(404).json({
                    status: 404,
                    error: `Car sale ad number ${theCar} is not found!`
                });
            };

            const {
                rows
            } = await adModel.theUpdater(car_id, req.body);
            return res.status(200).json({
                status: 200,
                message: 'The Ad\'s  successfully updated!',
                data: rows[0]
            });

        } catch (err) {
            return res.status(500).json({
                status: 500,
                error: err.message
            });
        }
    }

    static async deleteAd(req, res) {

        try {
            const {
                car_id
            } = req.params
            const {
                rows
            } = await adModel.specificAd(parseInt(car_id));

            if (rows.length === 0) {
                return res.status(404).json({
                    status: 404,
                    error: `Car sale ad number ${car_id} is not found!`
                });
            };
            await adModel.removeAd(car_id);
            return res.status(200).json({
                status: 200,
                message: `Car sale ad number ${car_id} successfully deleted!`,
            });
        } catch (err) {
            return res.status(500).json({
                status: 500,
                error: err.message
            })
        }

    }
}

export default Ad;