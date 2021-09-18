// main file for all routes app
const router = require('express').Router()

// import all app routes from components folder


// home route
router.get('/',(req,res)=>{
    res.status(200).json({
        message: 'server work from routes file',
        path: req.url
    })
})

// auth routes

// export router
module.exports = router