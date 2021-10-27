const router = require('express').Router()
const { registerService, loginService, refreshTokenService, logoutService } = require('./service')
const { registerController, loginController, refreshTokenController, logoutController } = require('./controller')

// signin route
router.post("/register",registerController,registerService)

// login route
router.post('/login', loginController, loginService)

// refresh token route
router.post('/refresh-token', refreshTokenController, refreshTokenService)

// logout route
router.delete('/logout' , logoutController, logoutService)

module.exports = router