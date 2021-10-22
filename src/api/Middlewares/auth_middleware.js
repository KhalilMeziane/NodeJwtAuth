const JWT = require('jsonwebtoken')
const createError = require('http-errors')

// middleware for verify authorization
exports.verifyAuthorization = (req,res,next)=>{
    if(!req.headers['authorization']){
        return next(createError.Unauthorized())
    }
    const authHeader = req.headers['authorization']
    const bearerToken = authHeader.split(' ')
    const token = bearerToken[1]
    JWT.verify(token,process.env.ACCESS_TOKEN_SECRET,(error,payload)=>{
        if(error){
            const message = error.name === "JsonWebTokenError"? "Unauthorized":error.message
            return next(createError.Unauthorized(message))
        }
        req.payload = payload
        next()
    })
}