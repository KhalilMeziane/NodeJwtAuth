const JWT = require('jsonwebtoken')
const createError = require('http-errors')
// generate access token for registration
const signAccessToken = (userId)=>{
    return new Promise((resolve,reject)=>{
        const payload = {}
        const options = {
            expiresIn: "15m",
            issuer: "khalil.com",
            audience: userId
        }
        JWT.sign(payload,process.env.ACCESS_TOKEN_SECRET,options,(error,token)=>{
            if(error){
                reject(error)
            }
            resolve(token)
        })
    })
}

// generate access token for login
const loginAccessToken = (userId)=>{
    return new Promise((resolve,reject)=>{
        const payload = {
            iss: "khalil.com",
        }
        const options = {
            expiresIn: "15m",
            issuer: "khalil.com",
            audience: userId
        }
        JWT.sign(payload,process.env.ACCESS_TOKEN_SECRET,options,(error,token)=>{
            if(error){
                reject(createError.InternalServerError())
            }
            resolve(token)
        })
    })
}

module.exports = {
    signAccessToken,
    loginAccessToken
}