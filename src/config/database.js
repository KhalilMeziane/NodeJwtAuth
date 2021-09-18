const mongoose = require('mongoose')
const chalk = require('chalk')

exports.connect = async (req,res)=>{
    try{
        await mongoose.connect("dsk",{useNewUrlParser: true, useUnifiedTopology: true})
    }catch(error){
        console.log(chalk.bgRed(' Error When Connect To Database: ', error))
        res.status(500).json({
            message:"server down"
        })
    }
}