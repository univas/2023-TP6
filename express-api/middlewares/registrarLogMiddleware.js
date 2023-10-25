const fs = require("fs")

const registrarLogMiddleware = (req, res, next) => {
    const log_path = process.env.LOG_PATH

    const dateTime = new Date()
    const endpoint = req.originalUrl
    const token = req.header("Authorization") ?? ""

    const log = `${dateTime} - ${endpoint} ${token}\n`

    fs.appendFile(`${log_path}/acessos.log`, log, () => {})
    
    next()
}

module.exports = registrarLogMiddleware