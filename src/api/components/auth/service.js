const UserSchema = require('./model')
const createError = require('http-errors')
const client = require('../../../helpers/redis_helper')
const { signAccessToken, loginAccessToken, signRefreshToken, verifyRefreshToken } = require('../../../helpers/jwt_helper')

const registerService = async (req,res,next)=>{
    const { email, password, confirm, name } = req.body
    try{
        const user = await UserSchema.findOne({ email: email})
        if(user){
            throw createError.Conflict(`this email already been used before`)
        }
        const newUser = new UserSchema({
            email: email,
            password: password,
            confirm: confirm,
            name: name
        })
        const savedNewUser = await newUser.save()
        const resolveResult = await Promise.all([
            signAccessToken(savedNewUser.id),
            signRefreshToken(savedNewUser.id)
        ])
        res.status(201).json({
            message:'successful registration',
            accessToken: resolveResult[0],
            refreshToken: resolveResult[1]
        })
    }catch(error){
        next(error)
    }
}

const loginService = async (req,res,next)=>{
    const { email, password } = req.body
    try{
        const user = await UserSchema.findOne({ email: email})
        if(!user){
            throw createError.BadRequest(`invalid email or password`)
        }
        console.time()
        const isMatch = await user.comparePassword(password)
        console.timeEnd()
        if(!isMatch){
            throw createError.Unauthorized("invalid email or password")
        }
        const resolveResult = await Promise.all([
            loginAccessToken(user.id),
            signRefreshToken(user.id)
        ])
        res.status(201).json({
            message:'successful login',
            accessToken: resolveResult[0],
            refreshToken: resolveResult[1]
        })
    }catch(error){
        next(error)
    }
}

const refreshTokenService = async (req,res,next)=>{
    try{
        const { refreshToken } = req.body
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
}

const logoutService = async (req,res,next)=>{
    try{
        const { refreshToken } = req.body 
        const userId = await verifyRefreshToken(refreshToken)
        client.DEL(userId,(error,value)=>{
            if(error){
                throw createError.InternalServerError()
            }
            res.sendStatus(204)
        })
    }catch(error){
        next(error)
    }
}

module.exports = {
    registerService,
    loginService,
    refreshTokenService,
    logoutService
}