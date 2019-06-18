import adModel from '../models/adModel';
import userModel from '../models/userModel';
import adFields from '../helpers/adValidator';
import moment from 'moment';

class Ad{

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

    }

    // User get all unsold cars. 
     static async getAllCars(req, res, next) {
     
        try {

            let  {rows} = await adModel.findPrice(); 
            const thePrice = rows; 
            // console.log('The Price:',thePrice);

            if (req.query.status === 'available' && req.query.min_price >=thePrice &&  req.query.max_price <= thePrice){

                // Available cars within a certain range. 
                const finishedFilter= [req.query.status , req.query.min_price,  req.query.max_price];

                // console.log('The Range:', inSomeRange); 
                const {inRange} = await adModel.priceRange(finishedFilter);   

                console.log('The rows:', inRange);

                if(!theAVailable[0]) {
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

            if (req.query.status === "available"){

                // cars with just "available" status.
                const available_cars = req.query.status;
               const {rows} = await adModel.availableCars(available_cars); 

                return res.status(200).json({
                    status: 200,
                    message: 'Here are all available cars',
                    data: rows

                });
            };

            if(req.user.is_admin === true) {
                
                const {rows} = await adModel.allCars(); 
                return res.status(200).json({
                    status: 200,
                    message: 'Here are all the cars!',
                    data: rows
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
    }

    // Seller update the status or price of the car/car ad.

    static  async updateStatus(req, res) {
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
    }

    static async updatePrice(req, res){
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
    }

  static  async deleteAd(req, res) {

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