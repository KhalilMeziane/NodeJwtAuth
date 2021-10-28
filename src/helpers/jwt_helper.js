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

// sign refresh token
const signRefreshToken = (userId)=>{
    return new Promise((resolve,reject)=>{
        const payload = {}
        const options = {
            expiresIn: "1y",
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
                    reject(createError.InternalServerError())
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

            // verifyRefreshToken id refresh token exist in redis db
            client.GET(userId,(error,result)=>{
                if(error){
                    reject(createError.InternalServerError())
                }
                if(refreshToken === result){
                    resolve(userId)
                }
                reject(createError.Unauthorized())
            })
        })
    })
}

module.exports = {
    signAccessToken,
    loginAccessToken,
    signRefreshToken,
    verifyRefreshToken
}