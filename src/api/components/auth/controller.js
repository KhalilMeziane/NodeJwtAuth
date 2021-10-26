const Joi = require('joi')
const registerController = async (req,res,next) => {

    const schema = Joi.object().keys({
        email: Joi.string().email().lowercase().required(),
        password: Joi.string().min(6).required()
    })
    try{
        const { email, password } = req.body
        await schema.validateAsync({ email, password })
        next()
    }catch(error){
        if(error.isJoi === true){
            error.status = 422
        }
        next(error)
    }
}

module.exports = {
    registerController
}