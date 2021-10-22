const mongoose = require("mongoose")
const chalk = require('chalk')

// connect to database
mongoose.connect(process.env.DB_URI,{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log(chalk.bgGreen(' Database Connected Successful '))
})
.catch((error)=>{
    console.log(chalk.bgRed(' Error When Connect To Database: ', error))
})

mongoose.connection.on('connected',()=>{
    console.log('Database Connected')
})

mongoose.connection.on('error',()=>{
    console.log(chalk.bgRed(' Error When Connect To Database: ', error))
})

mongoose.connection.on('disconnected',()=>{
    console.log('Database Disconnected')
})

process.on('SIGINT',async ()=>{
    await mongoose.connection.close()
    process.exit(0)
})