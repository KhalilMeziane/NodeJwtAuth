const router = require('express').Router()
const { registerService, loginService, refreshTokenService, logoutService } = require('./service')
const { registerController, loginController, refreshTokenController, logoutController } = require('./controller')

// signin route
router.post("/register",registerController,registerService)

// login route
router.post('/login', loginController, loginService)

// profile route
// this route need to change
// router.get('/profile', verifyAuthorization, async (req,res,next)=>{
//     if(!req.headers['authorization']){
//         throw createError.Unauthorized()
//     }
//     try{
//         const authHeader = req.headers['authorization']
//         const bearerToken = authHeader.split(' ')
//         const token = bearerToken[1]
//         const payload = await profileAccessToken(token)
//         const user = await User.findById(payload.aud)
//         res.json({
//             user: user
//         })
//     }catch(error){
//         next(createError.Unauthorized())
//     }
// })

// refresh token route
router.post('/refresh-token', refreshTokenController, refreshTokenService)

// logout route
router.delete('/logout' , logoutController, logoutService)

module.exports = router