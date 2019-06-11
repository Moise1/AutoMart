import flags from '../models/flagModel'; 
import flagFields from '../helpers/flagValidator';
import ads from '../models/adModel';
import moment from 'moment'; 


const Flag = {

    async createFlag(req, res){
        const {
            error
        } = flagFields(req.body);

        if (error) return res.status(400).json({
            status: 400,
            error: error.details[0].message
        });

        let m = moment(); 
            const created_on = m.format('hh:mm a , DD-MM-YYYY');
            const {reason, description} = req.body; 
    
            const findAd = ads.find(ad => ad.car_id === parseInt(req.body.car_id)); 

        try{

            if(!findAd) return res.status(404).json({
                status: 404, 
                error: `Sorry, car number ${req.body.car_id} not found!`
            })
    
            const newFlag = {
                id: flags.length + 1, 
                car_id: findAd.car_id, 
                reason: reason, 
                description: description, 
                created_on: created_on
            }

            flags.push(newFlag); 
            return res.status(201).json({
                status: 201, 
                message: 'Fraud Report Created!', 
                data: flags[flags.length -1]
            })

        }catch(error){
            return error.message
        }
    }
}



export default Flag;