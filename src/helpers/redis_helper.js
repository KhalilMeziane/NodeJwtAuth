const redis = require("redis")
const chalk = require('chalk')
const client = redis.createClient({
    port:6379,
    host:'127.0.0.1'
})

client.on('connect',()=>{
    console.log(chalk.bgYellow(' connected to redis '))
})

client.on("ready", () => {
    console.log('redis ready to use')
})

client.on("end", () => {
    console.log('redis disconnected')
})

client.on("error", (error) => {
    console.error(error)
})

process.on('SIGINT',async ()=>{
    client.quit()
})

module.exports = client