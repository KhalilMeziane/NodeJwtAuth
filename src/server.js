// main server for application
const HTTP = require('http')
const chalk = require('chalk')
const app = require('./api/app')
// eslint-disable-next-line no-undef
const PORT = normalizePort(process.env.PORT || 3000)

// setup port
app.set('port', PORT)

// create http server
const server = HTTP.createServer(app)

// server listen
server.listen(PORT,()=>{
    console.log(`host: ${chalk.hex('#ffb142').bold(`http://localhost:${PORT}`)}`)
})

// normalizePort
function normalizePort(value) {
    let port = parseInt(value, 10)
    if (isNaN(port)){
      return value
    }
    if (port >= 0) {
      return port
    }
    return false
}