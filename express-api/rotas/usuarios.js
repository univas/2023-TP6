const express = require('express')
const router = express.Router()
const validacaoUsuario = require('../validacoes/usuarios')

// Criando função para criar as rotas e retornar o router
const rotas_usuarios = (usuarios_db) => {
    // rota de obter usuarios
    router.get("/usuarios", (req, res) => {
        // criando novo array com os usuarios sem a senha
        const usuarios_sem_senha = usuarios_db.map((usuario) => {
            return {
                nome: usuario.nome,
                login: usuario.login,
                email: usuario.email,
                id: usuario.id
            }
        })

        // enviando os usuarios
        res.send(usuarios_sem_senha)
    })

    // rota para obter um unico usuario pelo id
    router.get("/usuarios/:id", (req, res) => {
        // capturei o parametro enviado na requisição
        const id = req.params.id

        // filtrei todos os usuarios que atendem ao id passado
        const usuarios_filtrados = usuarios_db.filter(usuario => {
            return usuario.id == id
        })

        if(usuarios_filtrados.length == 0){
            return res.status(404).send()
        }

        // peguei o primeiro usuario da lista
        const usuario = usuarios_filtrados[0]

        // enviei como resposta um objeto sem a senha do usuario
        res.send({
            nome: usuario.nome,
            login: usuario.login,
            email: usuario.email,
            id: usuario.id
        })
    })

    // rota para criar um usuário novo
    router.post("/usuarios", (req, res) => {
        try{
            // buscar o último id criado
            const ultimo_id = usuarios_db.reduce((anterior, proximo) => {
                if(proximo.id > anterior){
                    return proximo.id
                }else{
                    return anterior
                }
            }, 0)

            // criar o novo usuário
            const usuario_novo = req.body

            validacaoUsuario(usuario_novo)

            // inserir o novo id ao usuário criado
            usuario_novo.id = ultimo_id + 1

            // inserir o usuário no array
            usuarios_db.push(usuario_novo)

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
        try{
            // obtendo o parametro id enviado por meio de uma desestruturação
            const {id} = req.params

            // busca o usuário pelo ID
            const usuarios_filtrados = usuarios_db.filter(u =>{
                return u.id == id
            })

            // Verifica se o usuário existe
            if(usuarios_filtrados.length == 0){
                // Se não existir devolve erro 404
                return res.status(404).send()
            }
            const dados_novos = req.body
            validacaoUsuario(dados_novos)

            // atualiza os dados do usuário buscado
            const usuario = usuarios_filtrados[0]
            usuario.email = req.body.email
            usuario.login = req.body.login
            usuario.nome = req.body.nome
            usuario.senha = req.body.senha

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
        // obtendo o parametro id enviado por meio de uma desestruturação
        const {id} = req.params

        // busca o usuário pelo ID
        const usuarios_filtrados = usuarios_db.filter(u =>{
            return u.id == id
        })

        // Verifica se o usuário existe
        if(usuarios_filtrados.length == 0){
            // Se não existir devolve erro 404
            return res.status(404).send()
        }

        // atualiza os dados do usuário buscado
        const usuario = usuarios_filtrados[0]
        usuario.email = req.body.email ?? usuario.email
        usuario.login = req.body.login ?? usuario.login
        usuario.nome = req.body.nome ?? usuario.nome
        usuario.senha = req.body.senha ?? usuario.senha

        // retorna com sucesso
        return res.send(usuario)
    })

    // rota para excluir um usuário da base DELETE
    router.delete("/usuarios/:id", (req, res) => {
        // obtendo parametro id enviado por meio de desestruturação
        const {id} = req.params

        // obtendo o usuário pelo ID
        const usuarios_filtrados = usuarios_db.filter(u => u.id == id)

        // verificando se o usuário existe
        if(usuarios_filtrados.length == 0){
            // se não existir, devolve um erro 404 pro cliente.
            return res.status(404).send()
        }

        // cria um novo array sem o usuário que deve ser excluído
        usuarios_db = usuarios_db.filter(u => u.id != id)

        return res.status(200).send()
    })

    return router
}



module.exports = rotas_usuarios