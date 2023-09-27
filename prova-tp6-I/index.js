require('dotenv').config()

const express = require('express')
const rotasPadrao = require('./rotas/index.js')
const rotasProduto = require('./rotas/produto.js')
const rotasCategoria = require('./rotas/categoria.js')
const app = express()

app.use(express.json())
app.use(rotasPadrao)
app.use(rotasProduto)
app.use(rotasCategoria)

app.listen(process.env.PORTA, () => {
    console.log("API rodando")
})