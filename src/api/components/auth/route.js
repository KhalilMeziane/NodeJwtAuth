const router = require('express').Router()

// signin route
router.post("/signin",(req,res,next)=>{
    res.json('signin route')
})

// login route
router.post("/login",(req,res,next)=>{
    res.json('login route')
})

module.exports = router