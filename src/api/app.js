// main file for application dependencies and middlewares
const express = require('express')
const morganMiddleware = require('../config/logger')
const app = express()
const routes = require('./routes')
const cors = require('cors')
const helmet = require("helmet")

// setup dotenv for environment variable
require('dotenv').config()

// setup helmet for setting various HTTP headers
app.use(helmet())

// enable cors for application
app.use(cors())

// setup morgan middleware
app.use(morganMiddleware)

// setup body-parser
app.use(express.json())

// setup main route
app.use(routes)

// export app
module.exports = app