const Joi = require('joi')
const createError = require('http-errors')

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

const loginController = async (req,res,next)=>{
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

const refreshTokenController = async (req,res,next) => {
    try{
        const { refreshToken } = req.body
        if(!refreshToken){
            throw createError.BadRequest()
        }
        next()
    }catch(error){
        next(error)
    }
}

const logoutController = (req,res,next)=>{
    try{
        const { refreshToken } = req.body 
        if(!refreshToken){
            throw createError.BadRequest()
        }
        next()
    }catch(error){
        next(error)
    }
}

module.exports = {
    registerController,
    loginController,
    refreshTokenController,
    logoutController
}