const User = require('../auth/model')
const createError = require('http-errors')

const profileService = async (req,res,next)=>{
    try{
        const user = await User.findById(req.payload.aud)
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