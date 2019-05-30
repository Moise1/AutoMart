import Joi from 'joi'; 

const orderFields = (order) => {
    const schema = {
        price_offered: Joi.number().required(),
        status: Joi.string().min(2).max(50).regex(/^\S+$/).required(),
        car_id: Joi.number().required(),


       
    };

    const options = {
        language: {
            key: '{{key}} ',
            string: {
                regex: {
                    base: 'must not have empty spaces'
                }
            }
        }
    }

    return Joi.validate(order, schema, options);
};

export default orderFields;