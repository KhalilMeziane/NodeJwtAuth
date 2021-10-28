const router = require('express').Router()
// const {  } = require('./controller')
const { profileService } = require('./service')
const { verifyAuthorization } = require('../../Middlewares/auth_middleware')

// profile route
router.get('/profile', verifyAuthorization, profileService)


module.exports = router