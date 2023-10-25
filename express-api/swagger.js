// Importação da biblioteca para gerar a documentação automaticamente
const autogen = require("swagger-autogen")()

// Definição do arquivo resultado da documentação
const fileDocs = './swaggerOutput.json'

// Definição dos arquivos que mapeam as rotas da aplicação
const routeFiles = [
    './rotas/usuarios.js',
    './rotas/token.js'
]

// Geração da documentação automaticamente
autogen(fileDocs, routeFiles)