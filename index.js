const express = require('express')
const port = 3000

const app = express()

const rotas = require('./rotas/pessoa.js')

app.use(express.json())

app.use((req, res, next) => {
    console.log(req.body)

    next()
})

app.use(rotas)

app.listen(port, () => {
    console.log("executando")
})