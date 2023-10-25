const autogen = require("swagger-autogen")()

const fileDocs = './swaggerOutput.json'

const routeFiles = [
    './rotas/usuarios.js',
    './rotas/token.js'
]

autogen(fileDocs, routeFiles)