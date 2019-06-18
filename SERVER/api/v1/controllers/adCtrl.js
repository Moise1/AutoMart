import adModel from '../models/adModel';
import userModel from '../models/userModel';
import adFields from '../helpers/adValidator';
import moment from 'moment';

const Ad = {

    // Create a new car/car ad. 
    async createAd(req, res) {
        const {
            error
        } = adFields(req.body);

        if (error) return res.status(400).json({
            status: 400,
            error: error.details[0].message
        });


        try {

            const owner_email= req.user.email; 

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

    },

    // User get all unsold cars. 
    async getAllCars(req, res, next) {

        const range = {
            min: 0,
            max: 500000000000
        }
        const maxCarPrice =  range.max;
        const minCarPrice = range.min;

        try {
            if (req.query.status === "available") {

                // cars with just "available" status.
                const available_cars = req.query.status;
               const {rows} = await adModel.availableCars(available_cars); 

                return res.status(200).json({
                    status: 200,
                    message: 'Here are all available cars',
                    data: rows

                });
            };

            if (req.query.status === "avilable" &&  req.query.min_price >= minCarPrice && req.query.max_price <= maxCarPrice) {
                // Available cars within a certain range.    
                const somePrices= req.query.status && req.query.min_price && req.query.max_price;
                const {rows} = await adModel.priceRange(somePrices);
                return res.status(200).json({
                    staus: 200,
                    message: 'Cars within that price range',
                    data: rows
                })
            };

            if (req.user.is_admin === true) {
                
                const {rows} = await adModel.allCars(); 
                return res.status(200).json({
                    status: 200,
                    message: 'Here are all the cars!',
                    data: rows
                })
            }

            return res.status(403).json({
                status: 403,
                error: 'Sorry! You\'re not the admin'
            });

        } catch (err) {
            return res.status(500).json({
                status: 500,
                error: err.message
            })
        }

    },

    // Seller get a single car/car ad. 
    async getOneAd(req, res) {

        const findAd = ads.find(ad => ad.car_id === parseInt(req.params.car_id));
        try {
            if (!findAd) {
                return res.status(404).json({
                    status: 404,
                    error: `Car sale ad number ${req.params.car_id} is not found!`
                })
            };

            return res.status(200).json({
                status: 200,
                message: 'Congs, here\'s your result!',
                data: [findAd]
            })

        } catch (err) {
            return res.status(500).json({
                status: 500,
                error: err.message
            });
        }
    },

    // Seller update the status or price of the car/car ad.

    async updateStatus(req, res) {
        const findAd = ads.find(ad => ad.car_id === parseInt(req.params.car_id));
        let m = moment();
        const modified_on = m.format('hh:mm a,  DD-MM-YYYY');
        try {

            if (!findAd) {
                return res.status(404).json({
                    status: 404,
                    error: `Car sale ad number ${req.params.car_id} is not found!`
                });
            };

            findAd.status = req.body.status || findAd.status;
            findAd.modified_on = modified_on;

            return res.status(200).json({
                status: 200,
                message: 'Ad\'s status  successfully updated!',
                data: [findAd]
            });

        } catch (err) {
            return res.status(500).json({
                status: 500,
                error: err.message
            });
        }
    },

    async updatePrice(req, res){
        const findAd = ads.find(ad => ad.car_id === parseInt(req.params.car_id));
        let m = moment();
        const modified_on = m.format('hh:mm a,  DD-MM-YYYY');

        try {
            if (!findAd) {
                return res.status(404).json({
                    status: 404,
                    error: `Car sale ad number ${req.params.car_id} is not found!`
                });
            };

            findAd.price = "$" + req.body.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || findAd.price;
            findAd.modified_on = modified_on;

            return res.status(200).json({
                status: 200,
                message: 'Ad\'s price successfully updated!',
                data: [findAd]
            });

        } catch (err) {
            return res.status(500).json({
                status: 500,
                error: err.message
            });
        }
    },

    async deleteAd(req, res) {

        const findAd = ads.find(ad => ad.car_id === parseInt(req.params.car_id));
        
        if (!findAd) {
            return res.status(404).json({
                status: 404,
                error: `Car sale ad number ${req.params.car_id} is not found!`
            });
        };

        try {
                const index = ads.indexOf(findAd);
                ads.splice(index, 1);
                return res.status(200).json({
                    status: 200,
                    message: `Car sale ad number ${req.params.car_id} successfully deleted!`,
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