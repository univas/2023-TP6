const axios = require('axios')

const promisePOST = axios.post("http://localhost:3000/pessoas", {
    nome: "José",
    profissao: "Porteiro"
})

promisePOST.then((resposta) => {
    console.log(resposta.data)
    const registroSalvoPromise = axios.get("http://localhost:3000/pessoas/"+resposta.data.id)

    registroSalvoPromise.then((resposta) =>{
        console.log("Dados cadastrados:", resposta.data)
        const respostaDeletePromise = axios.delete("http://localhost:3000/pessoas/"+resposta.data.id)

        respostaDeletePromise.then((resposta) => {
            console.log("Registro excluído com sucesso.")
        }).catch((erro) => {
            console.log("Não consegui encontrar o registro para excluir.")
        })
    }).catch((erro) => {
        console.log("Não consegui encontrar o registro.")
    })
}).catch((erro) => {
    console.log("Impossível cadastrar neste momento. Tente novamente mais tarde.")
})

const promiseGET = axios
    .get("http://localhost:3000/pessoas")

promiseGET.then((resposta) => {
    const listaDePessoas = resposta.data

    const listaDePessoasQueComecamComM = listaDePessoas.filter((pessoa) => {
        // Deve retornar um teste que resulta verdadeiro ou falso para incluir ou não na nova lista
        return pessoa.nome[0] == 'M'
    })

    console.log(listaDePessoasQueComecamComM)

    const listaUnicaDePessoas = []
    listaDePessoas.forEach(pessoa => {
        if(!listaUnicaDePessoas.includes(pessoa.nome)){
            listaUnicaDePessoas.push(pessoa.nome)
        }
    }) 

    console.log(listaUnicaDePessoas)

    const profissoes = {}
    listaDePessoas.forEach(pessoa => {
        const profissaoAtual = pessoa.profissao
        if(profissoes[profissaoAtual]){
            profissoes[profissaoAtual]++
        }else{
            profissoes[profissaoAtual] = 1
        }
    }) 

    console.log(profissoes)
}).catch((erro) => {
    console.log("Impossível consultar pessoas neste momento. Por favor tente novamente mais tarde.")
})