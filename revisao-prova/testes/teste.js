const axios = require('axios')
const executar = async () => {
    const pessoa = {
        nome: "Marcos"
    }

    try{
        const response = await axios.post('http://localhost:3000/pessoa', pessoa)
    }catch(err){
        console.log(err.message)
    }
}

executar()