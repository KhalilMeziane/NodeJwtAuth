// main file for application dependencies and middlewares
const express = require('express')
const morganMiddleware = require('../config/logger')
const app = express()
const chalk = require('chalk')
const mongoose = require('mongoose')
const routes = require('./routes')
const cors = require('cors')
const helmet = require("helmet")
const rateLimit = require("express-rate-limit")
const createError = require('http-errors')

// setup dotenv for environment variable
require('dotenv').config()

// setup express-rate-limit limit repeated requests
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    handler:(req,res)=>{
        return res.status(429).json({
            error:'You sent too many requests. Please wait a while then try again'
        })
    }
})
app.use("/api", apiLimiter)

// setup helmet for setting various HTTP headers
app.use(helmet())

// enable cors for application
app.use(cors())

// setup morgan middleware
app.use(morganMiddleware)

// enable express to parse request body of type application/json
app.use(express.json())

// connect to database
async function connect(){
    try{
        await mongoose.connect(process.env.DB_URI,{useNewUrlParser: true, useUnifiedTopology: true})
        console.log(chalk.bgGreen(' Database Connected Successful '))
    }catch(error){
        console.log(chalk.bgRed(' Error When Connect To Database: ', error))
    }
}
connect()

// setup main route
app.use("/api",routes)

// 404 route
app.use((req,res,next)=>{
    next(createError.NotFound())
})
app.use((err,req,res,next)=>{
    res.status(err.status || 500).json({
        error:{
            status: err.status,
            message: err.message
        }
    })
})

// export app
module.exports = app