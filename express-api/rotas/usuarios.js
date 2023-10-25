const express = require('express')
const ValidaToken = require('../middlewares/ValidaToken')
const { buscarUsuario, usuarios } = require('../repositorios/usuarios')
const router = express.Router()


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
    router.get("/usuarios", (req, res) => {
        // #swagger.tags = ['Usuarios']
        // #swagger.summary = 'Uma breve explicação, com poucas palavras.'
        // #swagger.description = 'Descrição mais detalhada da rota, aqui podemos inserir informações importantes, orientações, problemas, atualizações, etc'
        /* #swagger.responses[200] = {
            description: 'Retorno com sucesso, devolve todos os dados dos usuários.',
            schema: [
                {
                    nome: 'Nome completo',
                    login: 'username',
                    email: 'email@mail.com'
                }
            ]
        }
            #swagger.responses[404] = {
                description: 'Quando não existe nenhum dado'
            }
            #swagger.responses[400] = {
                description: 'Quando o usuário ou cliente envia dados de forma incorreta.',
                schema: "Mensagem de erro apontando as falhas enviadas"
            }
        
        */
        const {nome, login, email} = req.query

        const parametros = {}

        if(nome){
            parametros.nome = nome
        }

        if(login){
            parametros.login = login
        }

        if(email){
            parametros.email = email
        }

        const usuarios = usuarios_repositorio.getAll(parametros)

        // enviando os usuarios
        res.send(usuarios)
    })

    // rota para obter um unico usuario pelo id
    router.get("/usuarios/:id", (req, res) => {
        // #swagger.tags = ['Usuarios']
        try{
            // capturei o parametro enviado na requisição
            const id = req.params.id
            const usuario = usuarios_repositorio.getById(id)
            // enviei como resposta um objeto devolvido pelo repositório
            res.send(usuario)
        }catch(error){
            // Capturei o erro enviado
            console.log(error.message)
            const conteudo_erro = JSON.parse(error.message)

            // Retornando os erros e status correto
            return res.status(conteudo_erro.status).send()
        }
    })

    // rota para criar um usuário novo
    router.post("/usuarios", (req, res) => {
        // #swagger.tags = ['Usuarios']
        /* #swagger.parameters['usuario'] = {
            in: 'body',
            description: 'Dados enviados para cadastrar o usuário',
            required: true,
            schema: {
                $nome: 'Nome',
                $login: 'username',
                email: 'email@mail.com',
                senha: '123456'
            }
        } */
        try{
            const usuario_novo = usuarios_repositorio.create(req.body)
            // enviar a resposta
            res.send(usuario_novo)
        }catch(error){
            // Capturei o erro enviado
            const conteudo_erro = JSON.parse(error.message)

            // Retornando os erros e status correto
            return res.status(conteudo_erro.status).send(conteudo_erro.erros)
        }
    })

    // rota para atualizar os dados de um usuário PUT
    router.put("/usuarios/:id", (req, res) => {
        // #swagger.tags = ['Usuarios']
        try{
            // obtendo o parametro id enviado por meio de uma desestruturação
            const {id} = req.params
            
            // Solicitando ao repositorio para atualizar os dados do usuario
            const usuario = usuarios_repositorio.update(req.body, id)

            // retorna com sucesso
            return res.send(usuario)
        }catch(error){
            // Capturei o erro enviado
            const conteudo_erro = JSON.parse(error.message)

            // Retornando os erros e status correto
            return res.status(conteudo_erro.status).send(conteudo_erro.erros)
        }

    })

    // rota para atualizar os dados de um usuário, considerando apenas os que foram enviados
    router.patch("/usuarios/:id", (req, res) => {
        // #swagger.tags = ['Usuarios']
        // obtendo o parametro id enviado por meio de uma desestruturação
        const {id} = req.params

        const usuario_cadastrado = buscarUsuario(id)

        // atualiza os dados do usuário buscado
        usuario_cadastrado.email = req.body.email ?? usuario_cadastrado.email
        usuario_cadastrado.login = req.body.login ?? usuario_cadastrado.login
        usuario_cadastrado.nome = req.body.nome ?? usuario_cadastrado.nome
        usuario_cadastrado.senha = req.body.senha ?? usuario_cadastrado.senha

        const usuario = usuarios_repositorio.update(usuario_cadastrado, id)

        // retorna com sucesso
        return res.send(usuario)
    })

    // rota para excluir um usuário da base DELETE
    router.delete("/usuarios/:id", (req, res) => {
        // #swagger.tags = ['Usuarios']
        // obtendo parametro id enviado por meio de desestruturação
        const {id} = req.params

        // Executando a exclusão do usuário
        usuarios_repositorio.destroy(id)

        return res.status(200).send()
    })

    

    return router
}



module.exports = rotas_usuarios