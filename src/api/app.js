// main file for application dependencies and middlewares
const express = require('express')
const morganMiddleware = require('../config/logger')
const app = express()
const routes = require('./routes')
const cors = require('cors')
const helmet = require("helmet")
const { connect } = require('../config/database')

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
app.use(connect)

// setup main route
app.use(routes)

// export app
module.exports = app