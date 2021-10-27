const router = require('express').Router()
const { profileController } = require('./controller')
const { profileService } = require('./service')
// const { profileAccessToken } = require('../../../helpers/jwt_helper')

// profile route
router.get('/profile', profileController, profileService)


module.exports = router