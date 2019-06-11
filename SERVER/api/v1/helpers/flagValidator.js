import Joi from 'joi'; 

const flagFields = (flag) => {
    const schema = {

        reason: Joi.string().required(),
        description: Joi.string().required(),
        car_id: Joi.number().required()
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

    return Joi.validate(flag, schema, options);
};

export default flagFields;