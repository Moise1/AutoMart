import ads from '../models/adModel';
import adFields from '../helpers/adValidator';
import moment from 'moment';


const Ad = {
    async createAd(req, res) {
        const {
            error
        } = adFields(req.body);

        if (error) return res.status(400).json({
            status: 400,
            error: error.details[0].message
        });

        let m = moment();
        const created_on = m.format('@ hh:mm a , DD-MM-YYYY');

        const {
            manufacturer,
            body_type,
            model,
            state,
            price
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
                status: 'Available',
                price: "$ "+parseFloat(price),
                created_on: created_on
            };
            ads.push(newAd);
            return res.status(201).json({
                status: 201,
                message: 'Ad Successfully Created!',
                data: ads
            })
        } catch (err) {
            return res.status(500).json({
                status: 500,
                err: err.message
            })
        }

    },

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
                data: findAd
            })

        } catch (err) {
            return res.status(500).json({
                status: 500,
                error: err.message
            });
        }
    },

    async updateAd(req, res) {

        const findAd = ads.find(ad => ad.car_id === parseInt(req.params.car_id));
        let m = moment(); 
        const modified_on = m.format('@ hh:mm a,  DD-MM-YYYY');
        try {
            if (!findAd) {
                return res.status(404).json({
                    status: 404,
                    error: `Car sale ad number ${req.params.car_id} is not found!`
                });
            };
            findAd.status = req.body.status || findAd.status;
            findAd.price = "$ "+req.body.price || findAd.price;
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
    }
}

export default Ad;