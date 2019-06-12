import ads from '../models/adModel';
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

        let m = moment();
        const created_on = m.format('hh:mm a , DD-MM-YYYY');

        const {
            manufacturer,
            body_type,
            model,
            state,
            price,
            status
        } = req.body;

        try {
            const owner = req.user.email;
            const newAd = {
                car_id: ads.length + 1,
                owner: owner,
                manufacturer: manufacturer,
                body_type: body_type,
                model: model,
                state: state,
                status: status || "available",
                price: "$" + parseFloat(price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                created_on: created_on
            };
            ads.push(newAd);
            return res.status(201).json({
                status: 201,
                message: 'Ad Successfully Created!',
                data: ads[ads.length -1]
            })
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
        const maxCarPrice = "$" + range.max.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        const minCarPrice = "$" + range.min.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        try {
            if (req.query.status === "available") {
                // cars with just "available" status.
                const available = ads.filter(ad => ad.status === "available");
                return res.status(200).json({
                    status: 200,
                    message: 'Here are all available cars',
                    data: available

                });
            };
        
            if (req.query.status === "avilable" &&  "$" + req.query.min_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") >= minCarPrice && "$" + req.query.max_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")) {
                // Available cars within a certain range.    
                const priceRange = ads.filter(ad => ad.status ===  "available" &&  ad.price >= minCarPrice && ad.price <= maxCarPrice);
                return res.status(200).json({
                    staus: 200,
                    message: 'Cars within that price range',
                    data: priceRange
                })
            };

            if(req.user.is_admin === true){
                return res.status(200).json({
                    status: 200, 
                    message: 'Here are all the cars!', 
                    data: ads
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

    async updateAd(req, res) {
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
            findAd.price = "$" + req.body.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || findAd.price;
            findAd.modified_on = modified_on;

            return res.status(200).json({
                status: 200,
                message: 'Ad successfully updated!',
                data: [findAd]
            });

        } catch (err) {
            return res.status(500).json({
                status: 500,
                error: err.message
            });
        }
    }, 

    async deleteAd(req, res){
        const findAd = ads.find(ad => ad.car_id === parseInt(req.params.car_id));

        try{
            if (!findAd) {
                return res.status(404).json({
                    status: 404,
                    error: `Car sale ad number ${req.params.car_id} is not found!`
                });
            };

            const index = ads.indexOf(findAd);
            ads.splice(index, 1);
            return res.status(200).json({
                status: 200, 
                message: `Car sale ad number ${req.params.car_id} successfully deleted!`,
            })
        }catch(err){
            return res.status(500).json({
                status: 500, 
                error: err.message
            })
        }

    }
}

export default Ad;