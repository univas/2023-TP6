// Vou cadastrar um produto novo
// E verificar se ele foi salvo com sucesso

const axios = require("axios")

// caso de teste
const exec = async () => {
    const usuario = {
        "nome": "Luiz",
        "email": "luiz@univas.edu.br",
        "senha": "univas",
        "login": "luiz"
    }
    
    const url = "http://localhost:3124/usuarios"
    
    console.log("Teste de cadastro de usuário - INÍCIO")
    try{
        const responseGet = await axios.get(url)
        const dados = responseGet.data

        const response = await axios.post(url, usuario)
        
        const {status, data} = response

        const responseGet2 = await axios.get(url)
        const dados2 = responseGet2.data

        if(status == 200 && data && data.id && dados.length < dados2.length){
            console.log(`Teste executado com SUCESSO. ID ${data.id}`)
        }else{
            console.log("Falha ao executar teste")
        }
    }catch(err){
        console.log(err)
        console.log("Teste executado com FALHA")
    }

    console.log("Teste de cadastro de usuário - FIM")
}

module.exports = exec