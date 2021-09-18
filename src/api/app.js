// main file for application dependencies and middlewares
const express = require('express')
const morganMiddleware = require('../config/logger')
const app = express()
const chalk = require('chalk')
const routes = require('./routes')
const cors = require('cors')
const helmet = require("helmet")
const mongoose = require('mongoose')

// setup dotenv for environment variable
require('dotenv').config()

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
    await mongoose.connect(process.env.DB_URI,{useNewUrlParser: true, useUnifiedTopology: true})
    console.log(chalk.bgGreen('Database Connected Successfully'))
}
connect().catch((error)=>{
    console.log(chalk.bgRed('Error When Connect To Database: ', error))
})

// setup main route
app.use(routes)

// export app
module.exports = app