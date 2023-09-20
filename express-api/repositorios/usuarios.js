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

function transformarUsuarioParaRetorno(usuario){
    return {
        nome: usuario.nome,
        login: usuario.login,
        email: usuario.email,
        id: usuario.id
    }
}

const usuarios = () => {
    return {
        getByid: (id) => {
            // Verificar se o usuário existe
            // filtrei todos os usuarios que atendem ao id passado
            const usuarios_filtrados = usuarios_db.filter(usuario => {
                return usuario.id == id
            })

            if(usuarios_filtrados.length == 0){
                throw new Error(JSON.stringify({
                    status: 404
                }))
            }
            // pegar e devolver os dados sem a senha
            // peguei o primeiro usuario da lista
            const usuario = usuarios_filtrados[0]

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
                        if(!usuario[campo].includes(parametros[campo])){
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

        },
        update: (dados, id) => {

        },
        delete: (id) => {

        }
    }
}

module.exports = usuarios