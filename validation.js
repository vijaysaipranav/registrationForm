const joi = require('@hapi/joi');


// blue print for js objects 
const registerValidation= (data)=>{
    const schema = joi.object({
        name: joi.string().min(2).required(),
        email:joi.string().email().min(6).required(),
        password:joi.string().min(8).required(),
    })
    return schema.validate(data);

}

const loginValidation= (data)=>{
    const schema = joi.object({
        name: joi.string().min(2).required(),
        email:joi.string().email().min(6).required(),
        password:joi.string().min(8).required(),
    })
    return schema.validate(data);

}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;