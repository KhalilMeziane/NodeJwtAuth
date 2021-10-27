const createError = require('http-errors')

const profileController = (req,res,next)=>{
    try{
        if(!req.headers['authorization']){
            throw createError.Unauthorized()
        }
        next()
    }catch(error){
        next(error)
    }
}

module.exports = {
    profileController,
}