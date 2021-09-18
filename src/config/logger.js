const morgan = require('morgan')
const chalk = require('chalk')
const morganMiddleware = morgan((tokens, req, res)=>{
    return [
        chalk.hex('#1771F1').bold(tokens.method(req, res)),
        chalk.hex('#ffb142').bold(tokens.url(req, res)),
        chalk.hex('#51EAFF').bold(tokens.status(req, res)),
        chalk.hex('#76FEC5').bold(tokens['response-time'](req, res),'ms'),
        chalk.hex('#1771F1').bold(new Date().toLocaleString('en-US',{hour:'2-digit',minute:'2-digit',second:"2-digit"}))
    ].join(' ')
})
module.exports = morganMiddleware