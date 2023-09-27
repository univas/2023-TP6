let categorias = [
    {
        nome: "Eletrodomesticos",
        id: 1
    }
]

let ultimo_id = 1
const validacao = require("../validacoes/categoria")

const repositorio = () => {
    return {
        getAll: (params) => {
            const listaDeParametros = Object.keys(params)

            const categorias_filtradas = categorias.filter(cat => {
                let deveRetornar = true

                listaDeParametros.forEach(parametro => {
                    if(!cat[parametro].includes(params[parametro])){
                        deveRetornar = false
                    }
                })

                return deveRetornar
            })

            return categorias_filtradas
        },

        get: (id) => {
            const categorias_filtradas = categorias.filter(cat => {
                return cat.id == id
            })

            if(categorias_filtradas.length == 0){
                throw new Error(JSON.stringify({
                    status: 404,
                    mensagem: ""
                }))
            }

            return categorias_filtradas[0]
        },

        create: (dados) => {
            if(validacao(dados)){
                const categoria = dados

                categoria.id = ++ultimo_id

                categorias.push(categoria)

                return categoria
            }else{
                throw new Error(JSON.stringify({
                    status: 400,
                    mensagem: "Dados incorretos para cadastrar."
                }))
            }
        },

        update: (dados, id) => {
            if(validacao(dados)){
                const categorias_filtradas = categorias.filter(cat => {
                    return cat.id == id
                })
    
                if(categorias_filtradas.length == 0){
                    throw new Error(JSON.stringify({
                        status: 404,
                        mensagem: ""
                    }))
                }

                const categoria = categorias_filtradas[0]

                categoria.nome = dados.nome

                return categoria
            }else{
                throw new Error(JSON.stringify({
                    status: 400,
                    mensagem: "Dados incorretos para atualizar."
                }))
            }
        },

        destroy: (id) => {
            const categorias_filtradas = categorias.filter(cat => {
                return cat.id == id
            })

            if(categorias_filtradas.length == 0){
                throw new Error(JSON.stringify({
                    status: 404,
                    mensagem: ""
                }))
            }

            categorias = categorias.filter(cat => {
                return cat.id != id
            })
        }
    }
}

module.exports = {
    repositorioCategorias: repositorio
}