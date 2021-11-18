const createError = require('http-errors')
const yup = require("yup")

const registerController = async (req,res,next) => {
    const registerSchema = yup.object({
        email: yup.string().email('Must be a valid email').max(255).required('Email is required'),
        password: yup.string().min(6).max(255).required(),
    })
    try{
        await registerSchema.validate(req.body, { abortEarly: false })
        next()
    }catch(error){
        if(error.errors){
            error.status = 422
        }
        next({message: error.errors})
    }
}

const loginController = async (req,res,next)=>{
    const loginSchema = yup.object({
        email: yup.string().email('Must be a valid email').max(255).required('Email is required'),
        password: yup.string().min(6).max(255).required(),
    })
    try{
        await loginSchema.validate(req.body, { abortEarly: false })
        next()
    }catch(error){
        if(error.errors){
            error.status = 422
        }
        next({message: error.errors})
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