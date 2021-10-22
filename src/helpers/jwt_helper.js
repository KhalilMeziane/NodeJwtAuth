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
        const payload = {}
        const options = {
            expiresIn: "8h",
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

// profile access token
const profileAccessToken = (token)=>{
    return new Promise((resolve,reject)=>{
        JWT.verify(token,process.env.ACCESS_TOKEN_SECRET,(error,payload)=>{
            if(error){
                reject(error)
            }
            resolve(payload)
        })
    })
}

module.exports = {
    signAccessToken,
    loginAccessToken,
    profileAccessToken
}