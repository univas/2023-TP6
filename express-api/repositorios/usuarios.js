const validacaoUsuario = require('../validacoes/usuarios')
const Usuario = require('../models/usuario')

function transformarUsuarioParaRetorno(usuario){
    return {
        nome: usuario.nome,
        login: usuario.login,
        email: usuario.email,
        id: usuario.id
    }
}

async function buscarUsuario(id){
    // // Verificar se o usuário existe
    // // filtrei todos os usuarios que atendem ao id passado  
    // const usuarios_filtrados = usuarios_db.filter(usuario => {
    //     return usuario.id == id
    // })

    // // pegar e devolver os dados sem a senha
    // // peguei o primeiro usuario da lista
    // if(usuarios_filtrados.length == 0){
    //     throw new Error(JSON.stringify({
    //         status: 404
    //     }))
    // }

    // return usuarios_filtrados[0]

    const usuario = await Usuario.findByPk(id)

    return usuario
}

function buscarUsuarioPorLoginESenha(login, senha){
    // Verificar se o usuário existe
    // filtrei todos os usuarios que atendem ao id passado  
    const usuarios_filtrados = usuarios_db.filter(usuario => {
        return usuario.login == login && usuario.senha == senha
    })

    // pegar e devolver os dados sem a senha
    // peguei o primeiro usuario da lista
    if(usuarios_filtrados.length == 0){
        throw new Error(JSON.stringify({
            status: 404
        }))
    }

    return transformarUsuarioParaRetorno(usuarios_filtrados[0])
}

const usuarios = () => {
    return {
        getById: async (id) => {
            // Buscar usuário na base
            const usuario = await buscarUsuario(id)

            return transformarUsuarioParaRetorno(usuario)
        },
        getAll: async (parametros) => {
            let usuarios_filtrados = await Usuario.findAll()

            // filtragem pelos parâmetros se existirem
            const camposParaValidar = Object.keys(parametros)
            // [nome, login, email] => por exemplo

            // Se existe parâmetro enviado pelo cliente
            if(camposParaValidar.length > 0){
                usuarios_filtrados = usuarios_filtrados.filter(usu => {
                    let ehValido = true

                    camposParaValidar.forEach(campo => {
                        if(!usu[campo].includes(parametros[campo])){
                            ehValido = false
                        }
                    })

                    return ehValido
                })
            }

            // retorno do resultado
            return usuarios_filtrados
        },
        create: async (dados) => {
            // Pego o último id inserido
            // Já tenho o último id sendo controlado por uma variável
            // Criar um usuário com os dados enviados
            const usuario_novo = dados

            // Validar o usuário criado
            validacaoUsuario(usuario_novo)

            // Atribuir um id 
            // usuario_novo.id = ++ultimo_id

            // Salvar no banco de dados
            const usuarioSalvo = await Usuario.create(usuario_novo)

            // retornar o usuário salvo
            return usuarioSalvo
        },
        update: async (dados, id) => {
            // busca o usuário pelo ID
            const usuario_cadastrado = await buscarUsuario(id)

            // Validar dados enviados
            validacaoUsuario(dados)

            // atualiza os dados do usuário buscado
            usuario_cadastrado.email = dados.email
            usuario_cadastrado.login = dados.login
            usuario_cadastrado.nome = dados.nome
            usuario_cadastrado.senha = dados.senha
            usuario_cadastrado.save()

            return usuario_cadastrado
        },
        destroy: async (id) => {
            await Usuario.destroy({
                where: {
                    id
                }
            })

            return true
        }
    }
}

module.exports = {
    usuarios,
    buscarUsuario,
    buscarUsuarioPorLoginESenha
}