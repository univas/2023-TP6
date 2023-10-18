const validacaoUsuario = require('../validacoes/usuarios')

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

let ultimo_id = 2

function transformarUsuarioParaRetorno(usuario){
    return {
        nome: usuario.nome,
        login: usuario.login,
        email: usuario.email,
        id: usuario.id
    }
}

function buscarUsuario(id){
    // Verificar se o usuário existe
    // filtrei todos os usuarios que atendem ao id passado  
    const usuarios_filtrados = usuarios_db.filter(usuario => {
        return usuario.id == id
    })

    // pegar e devolver os dados sem a senha
    // peguei o primeiro usuario da lista
    if(usuarios_filtrados.length == 0){
        throw new Error(JSON.stringify({
            status: 404
        }))
    }

    return usuarios_filtrados[0]
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
        getById: (id) => {
            // Buscar usuário na base
            const usuario = buscarUsuario(id)

            return transformarUsuarioParaRetorno(usuario)
        },
        getAll: (parametros) => {
            let usuarios_filtrados = usuarios_db
            // transformação dos dados para esconder atributos
            usuarios_filtrados = usuarios_db.map((usuario) => transformarUsuarioParaRetorno(usuario))

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
        create: (dados) => {
            // Pego o último id inserido
            // Já tenho o último id sendo controlado por uma variável
            // Criar um usuário com os dados enviados
            const usuario_novo = dados

            // Validar o usuário criado
            validacaoUsuario(usuario_novo)

            // Atribuir um id 
            usuario_novo.id = ++ultimo_id

            // Salvar no banco de dados
            usuarios_db.push(usuario_novo)

            // retornar o usuário salvo
            return usuario_novo
        },
        update: (dados, id) => {
            // busca o usuário pelo ID
            const usuario_cadastrado = buscarUsuario(id)

            // Validar dados enviados
            validacaoUsuario(dados)

            // atualiza os dados do usuário buscado
            usuario_cadastrado.email = dados.email
            usuario_cadastrado.login = dados.login
            usuario_cadastrado.nome = dados.nome
            usuario_cadastrado.senha = dados.senha

            return usuario_cadastrado
        },
        destroy: (id) => {
            // Verificando se o usuário existe.
            const usuario = buscarUsuario(id)

            // cria um novo array sem o usuário que deve ser excluído
            usuarios_db = usuarios_db.filter(u => u.id != id)

            return true
        }
    }
}

module.exports = {
    usuarios,
    buscarUsuario,
    buscarUsuarioPorLoginESenha
}