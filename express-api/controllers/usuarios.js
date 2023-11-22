const { buscarUsuario, usuarios } = require('../repositorios/usuarios')
const usuarios_repositorio = usuarios()

const UsuarioController = {
    getAll: (req, res) => {
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
    },
    create: (req, res) => {
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
    },
    getById: (req, res) => {
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
    }
}

module.exports = UsuarioController