const router = require('express').Router()
const createError = require('http-errors')
const UserSchema = require('./model')
const Joi = require('joi')

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
            throw createError.Conflict(`${check.email} already been used before`)
        }
        const newUser = new UserSchema({
            email: check.email,
            password: check.password
        })
        const savedNewUser = await newUser.save()
        res.status(201).json({
            message:'successful registration',
            body: savedNewUser
        })
    }catch(error){
        if(error.isJoi === true){
            error.status = 422
        }
        next(error)
    }
})

module.exports = router