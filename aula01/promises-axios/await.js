const axios = require('axios')
const baseApi = "http://localhost:3000/pessoas"

async function executar(){
    let contPost = undefined
    try{
        const respostaPost = await axios.post(baseApi, {
            nome: "Joaquim", profissao: "Encanador"
        })
        contPost = respostaPost.data
        console.log("Registro criado com sucesso.", contPost)
    }catch(err){
        console.log("Não foi possível cadastrar")
    }
    
    try{
        const contGet = await buscarPessoa(contPost.id)
        console.log("Dado retornado", contGet)
        buscarPessoa(5).then((resposta) => {
            console.log(resposta)
        })
    }catch(err){
        console.log(err)
    }
}

async function buscarPessoa(id){
    const respostaGet = await axios.get(`${baseApi}/${id}`)
    return respostaGet.data
}

// executar()



async function variasPromessas(){
    const pessoasParaCadastrar = [
        { nome: "Luis", profissao: "padeiro"},
        { nome: "Carlos", profissao: "Motorista"}
    ]

    const promessas = pessoasParaCadastrar.map(pessoa => {
        return axios.post(baseApi, pessoa)
    })
    
    const resultado = await Promise.all(promessas)

    resultado.forEach(res => {
        console.log(res.data)
    })
}

variasPromessas()