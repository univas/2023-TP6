// Importação do Express
const express = require("express")
// Definição da porta
const porta = 3124

// importando rotas de usuários
const rotas_usuarios = require('./rotas/usuarios')

// Banco de dados em memória
let usuarios_db = [
    {
        nome: "marcos",
        login: "marcosantonio",
        senha: "123456",
        email: "marcosantonio@univas.edu.br",
        id: 1
    },
    {
        nome: "João da Silva",
        login: "joaosilva",
        senha: "654321",
        email: "joaosilva@univas.edu.br",
        id: 2
    }
]

// Instanciando a aplicação
const app = express()

// Definir que os dados enviados serão no formato json no corpo da requisição
app.use(express.json())

// configurando as rotas importadas dentro do app
// chamando a função injetando uma dependência
app.use(rotas_usuarios(usuarios_db))

// rota raiz
app.get("/", (req, res) => {
    res.send("API executando...")
})

// Iniciando aplicação
app.listen(porta, (err) => {
    if(err){
        console.log("Erro ao subir aplicação")
    }else{
        console.log(`Aplicação executando na porta ${porta}`)
    }
})