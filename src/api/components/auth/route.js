const router = require('express').Router()
const createError = require('http-errors')
const UserSchema = require('./model')
const Joi = require('joi')
const { signAccessToken, loginAccessToken, profileAccessToken, signRefreshToken, verifyRefreshToken } = require('../../../helpers/jwt_helper')
const User = require('./model')
const { verifyAuthorization } = require('../../Middlewares/auth_middleware')

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
        const refreshToken = await signRefreshToken(savedNewUser.id)
        res.status(201).json({
            message:'successful registration',
            body: savedNewUser,
            accessToken: token,
            refreshToken: refreshToken
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
        const refreshToken = await signRefreshToken(user.id)
        res.status(201).json({
            message:'successful login',
            accessToken: token,
            refreshToken: refreshToken
        })
    }catch(error){
        if(error.isJoi === true){
            error.status = 422
        }
        next(createError.InternalServerError())
    }
})

// profile route
router.get('/profile',verifyAuthorization, async (req,res,next)=>{
    if(!req.headers['authorization']){
        throw createError.Unauthorized()
    }
    try{
        const authHeader = req.headers['authorization']
        const bearerToken = authHeader.split(' ')
        const token = bearerToken[1]
        const payload = await profileAccessToken(token)
        const user = await User.findById(payload.aud)
        res.json({
            user: user
        })
    }catch(error){
        next(createError.Unauthorized())
    }
})

// refresh token route
router.post('/refresh-token',async (req,res,next)=>{
    try{
        const { refreshToken } = req.body
        if(!refreshToken){
            throw createError.BadRequest()
        }
        const userId = await verifyRefreshToken(refreshToken)
        const newAccessToken = await signAccessToken(userId)
        const newRefreshToken = await signRefreshToken(userId)
        res.status(201).json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        })
    }catch(error){
        next(error)
    }
})

module.exports = router