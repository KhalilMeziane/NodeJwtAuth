const JWT = require('jsonwebtoken')
const createError = require('http-errors')
const client = require('../helpers/redis_helper')

// generate access token for registration
const signAccessToken = (userId)=>{
    return new Promise((resolve,reject)=>{
        const payload = {}
        const options = {
            expiresIn: "1y",
            issuer: "khalil.com",
            audience: userId
        }
        JWT.sign(payload,process.env.REFRESH_TOKEN_SECRET,options,(error,token)=>{
            if(error){
                reject(createError.InternalServerError(error))
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

// this end point need changes look to auth middleware
// because i have put payload of user in req object we dont need verify again
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

// sign refresh token
const signRefreshToken = (userId)=>{
    return new Promise((resolve,reject)=>{
        const payload = {}
        const options = {
            expiresIn: "15m",
            issuer: "beInRide.com",
            audience: userId
        }
        JWT.sign(payload,process.env.REFRESH_TOKEN_SECRET,options,(error,token)=>{
            if(error){
                reject(createError.InternalServerError(error))
            }
            // set refresh token in redis
            client.SET(userId,token,"EX",365*24*60*60,(error,replay)=>{
                if(error){
                    reject(createError.InternalServerError(error))
                }
                console.log("replay: ",replay)
                resolve(token)
            })
        })
    })
}

// verify Refresh Token
const verifyRefreshToken = (refreshToken)=>{
    return new Promise((resolve,reject)=>{
        JWT.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(error,payload)=>{
            if(error){
                return reject(createError.Unauthorized())
            }
            const userId = payload.aud
            resolve(userId)
        })
    })
}

module.exports = {
    signAccessToken,
    loginAccessToken,
    profileAccessToken,
    signRefreshToken,
    verifyRefreshToken
}