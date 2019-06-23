import Joi from "joi"; 

const adFields = (ad) => {
    const schema = {
        manufacturer: Joi.string().min(3).max(20).required(),
        body_type: Joi.string().min(3).max(20).required(),
        model: Joi.string().required(),
        state: Joi.string().regex(/^\S+$/).min(3).max(255).valid(["new", "used"]).required(), 
        status: Joi.string().regex(/^\S+$/).min(3).max(255).valid(["available"]), 
        price: Joi.number().required(), 
    };

    const options = {
        language: {
            key: "{{key}} ",
            string: {
                regex: {
                    base: "must not have empty spaces"
                }
            }
        }
    };

    return Joi.validate(ad, schema, options);
};

export default adFields;