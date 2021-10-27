const { profileAccessToken } = require('../../../helpers/jwt_helper')
const User = require('../auth/model')
const createError = require('http-errors')

const profileService = async (req,res,next)=>{
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
}

module.exports = {
    profileService,
}