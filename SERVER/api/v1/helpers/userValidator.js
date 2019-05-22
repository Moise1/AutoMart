import Joi from 'joi'; 

const signUpFields = (user) => {
    const schema = {
        first_name: Joi.string().regex(/^\S+$/).min(3).max(20).required(),
        last_name: Joi.string().regex(/^\S+$/).min(3).max(20).required(),
        email: Joi.string().regex(/^\S+$/).email().required(),
        password: Joi.string().regex(/^\S+$/).min(3).max(255).required(), 
        address: Joi.string().regex(/^\S+$/).min(3).max(255).required(), 
        is_buyer: Joi.bool().required(), 
        is_seller: Joi.bool().required()

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

    return Joi.validate(user, schema, options);
};


const loginFields = (userFinder) => {
    const schema = {
        email: Joi.string().regex(/^\S+$/).email().required(),
        password: Joi.string().regex(/^\S+$/).min(3).max(255).required(),

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

    return Joi.validate(userFinder, schema, options);
}

export {signUpFields, loginFields};