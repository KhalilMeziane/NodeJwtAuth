const router = require('express').Router()
const createError = require('http-errors')
const UserSchema = require('./model')
const Joi = require('joi')
const { signAccessToken, loginAccessToken } = require('../../../helpers/jwt_helper')

// signin route
router.post("/register",async (req,res,next)=>{
    const schema = Joi.object().keys({
        email: Joi.string().email().lowercase().required(),
        password: Joi.string().min(6).required()
    })
    try{
        const { email, password } = req.body
        const check = await schema.validateAsync({ email, password })
        const user = await UserSchema.findOne({ email: check.email})
        if(user){
            throw createError.Conflict(`this email already been used before`)
        }
        const newUser = new UserSchema({
            email: check.email,
            password: check.password
        })
        const savedNewUser = await newUser.save()
        const token = await signAccessToken(savedNewUser.id)
        res.status(201).json({
            message:'successful registration',
            body: savedNewUser,
            token: token
        })
    }catch(error){
        if(error.isJoi === true){
            error.status = 422
        }
        next(error)
    }
})

// login route
router.post('/login',async (req,res,next)=>{
    const schema = Joi.object().keys({
        email: Joi.string().email().lowercase().required(),
        password: Joi.string().min(6).required()
    })
    try{
        const { email, password } = req.body
        const check = await schema.validateAsync({ email, password })
        const user = await UserSchema.findOne({ email: check.email})
        if(!user){
            throw createError.BadRequest(`invalid email or password`)
        }
        const isMatch = await user.comparePassword(check.password)
        if(!isMatch){
            throw createError.Unauthorized("email or password not valid")
        }
        const token = await loginAccessToken(user.id)
        res.status(201).json({
            message:'successful login',
            token: token
        })
    }catch(error){
        if(error.isJoi === true){
            error.status = 422
        }
        next(createError.InternalServerError())
    }
})

module.exports = router