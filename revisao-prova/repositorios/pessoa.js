const pessoas = []
let last_id = 0

const validador = require("../validacoes/pessoa.js")
const repositorio = {
    create: (dados) => {
        validador(dados)
        dados.id = ++last_id
        pessoas.push(dados)

        return dados
    },
    getAll: () => {
        return pessoas
    },
    getById: (id) => {
        const pessoasFiltradas = pessoas.filter(pessoa => pessoa.id == id)

        if(pessoasFiltradas.length > 0){
            return pessoasFiltradas[0]
        }else{
            return undefined
        }
    },
    update: (dados, id) => {
        if(!dados.email || dados.email.length == 0){
            throw new Error("É preciso enviar o email")
        }
    
        if(!dados.nome || dados.nome.length == 0){
            throw new Error("É preciso enviar o nome")
        }
        pessoas.forEach(pessoa => {
            if(pessoa.id == id){
                pessoa.nome = dados.nome
                pessoa.email = dados.email
            }
        })

        return dados
    },
    destroy: (id) => {
        const indice = pessoas.findIndex(pessoa => pessoa.id == id)

        pessoas.splice(indice, 1)

        return true
    }
}

module.exports = repositorio