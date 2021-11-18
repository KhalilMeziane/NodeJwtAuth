// main file for all routes app
const router = require('express').Router()
// import all app routes from components folder
const auth = require('./components/auth/route')

// authentication routes component
router.use('/auth',auth)

// export router
module.exports = router