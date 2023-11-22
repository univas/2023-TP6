const express = require('express')
const ValidaToken = require('../middlewares/ValidaToken')
const { buscarUsuario, usuarios } = require('../repositorios/usuarios')
const router = express.Router()

const controller = require('../controllers/usuarios.js')
const usuarios_repositorio = usuarios()

// Criando função para criar as rotas e retornar o router
const rotas_usuarios = () => {

    // Definição de um middleware para a rota especificada
    // Usando o router.use definimos um middleware para todos os verbos HTTP
    // Usando o router.[método] definimos um middleware apenas para o método especificado
    router.get('/usuarios', ValidaToken)
    router.get('/usuarios/:id', ValidaToken)
    router.put('/usuarios/:id', ValidaToken)
    router.patch('/usuarios/:id', ValidaToken)
    router.delete('/usuarios/:id', ValidaToken)

    // rota de obter usuarios
    router.get("/usuarios", controller.getAll)

    // rota para obter um unico usuario pelo id
    router.get("/usuarios/:id", controller.getById)

    // rota para criar um usuário novo
    router.post("/usuarios", controller.create)

    // rota para atualizar os dados de um usuário PUT
    router.put("/usuarios/:id", controller.update)

    // rota para atualizar os dados de um usuário, considerando apenas os que foram enviados
    router.patch("/usuarios/:id", controller.patch)

    // rota para excluir um usuário da base DELETE
    router.delete("/usuarios/:id", controller.remove)

    

    return router
}



module.exports = rotas_usuarios