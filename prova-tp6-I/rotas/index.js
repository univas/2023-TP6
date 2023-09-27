const Router = require('express').Router()

Router.get('/', (req, res) => {
    res.send("API rodando...")
})

module.exports = Router