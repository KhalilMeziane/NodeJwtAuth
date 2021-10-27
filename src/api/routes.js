// main file for all routes app
const router = require('express').Router()
// import all app routes from components folder
const auth = require('./components/auth/route')
const profile = require('./components/profile/route')

// authentication routes component
router.use('/auth',auth)
router.use('/user',profile)

// export router
module.exports = router