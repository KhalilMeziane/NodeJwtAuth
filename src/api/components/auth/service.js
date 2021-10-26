const UserSchema = require('./model')
const createError = require('http-errors')
const { signAccessToken, loginAccessToken, profileAccessToken, signRefreshToken, verifyRefreshToken } = require('../../../helpers/jwt_helper')

const registerService = async (req,res,next)=>{
    const { email, password } = req.body
    try{
        const user = await UserSchema.findOne({ email: email})
        if(user){
            throw createError.Conflict(`this email already been used before`)
        }
        const newUser = new UserSchema({
            email: email,
            password: password
        })
        const savedNewUser = await newUser.save()
        const accessToken = await signAccessToken(savedNewUser.id)
        const refreshToken = await signRefreshToken(savedNewUser.id)
        res.status(201).json({
            message:'successful registration',
            accessToken: accessToken,
            refreshToken: refreshToken
        })
    }catch(error){
        next(error)
    }
}

module.exports = {
    registerService
}