require('dotenv').config()
// Importação do Express
const express = require("express")


// IMportação dos arquivos do swagger
const swaggerui = require('swagger-ui-express')
const swaggerFile = require('./swaggerOutput.json')

// importamos o componente middleware
const registrarLogMiddleware = require('./middlewares/registrarLogMiddleware')

// importando rotas de usuários
const rotas_usuarios = require('./rotas/usuarios')

// importando rotas de token
const rotas_token = require('./rotas/token')

// Instanciando a aplicação
const app = express()

// Definir que os dados enviados serão no formato json no corpo da requisição
app.use(express.json())

// inserimos o middleware dentro da aplicação
app.use(registrarLogMiddleware)

// ADicionar um middleware da biblioteca do swagger
app.use('/docs', swaggerui.serve)

// configurando as rotas importadas dentro do app
// chamando a função injetando uma dependência
app.use(rotas_usuarios())
app.use(rotas_token())

// rota raiz
app.get("/", (req, res) => {
    res.send("API executando...")
})

app.use((req, res, next) => {
    console.log('Time:', Date.now())
    next()
})

app.get('/docs', swaggerui.setup(swaggerFile))

module.exports = app