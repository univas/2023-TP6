let produtos = [
    {
        nome: "Geladeira",
        preco: 4599.99,
        peso: 98.5,
        cor: "branca",
        marca: "Eletrolux",
        id: 1
    }
]
let ultimo_id = 1

const validacao = require("../validacoes/produto")

const produtoRepositorio = () => {
    return {
        get: (id) => {
            const produtosFiltrados = produtos.filter(prod => prod.id == id)

            if(produtosFiltrados.length == 0){
                throw new Error(JSON.stringify({
                    status: 404,
                    msg: ""
                }))
            }else{
                return produtosFiltrados[0]
            }
        },
        create: (dados) => {
            if(validacao(dados)){
                dados.id = ++ultimo_id

                produtos.push(dados)

                return dados
            }else{
                throw new Error("Dados inválidos para cadastrar.")
            }
        },
        destroy: (id) => {
            const produtos_filtrados = produtos.filter(prod => prod.id == id)

            if(produtos_filtrados.length == 0){
                throw new Error("Produto inexistente")
            }

            produtos = produtos.filter(prod => prod.id != id)

            return true
        }
    }
}

module.exports = {
    produtoRepositorio
};