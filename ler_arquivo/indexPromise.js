const fs = require("fs/promises")

async function executar(){
    try{
        const arquivo = await fs.readFile("./nomes.txt", {encoding: 'utf8'})

        const nomes = arquivo.split('\r\n')

        nomes.forEach((nome, index) => {
            console.log(`${index} ${nome}`)
        })
    }catch(err){
        console.log("Impossível ler o arquivo")    
    }
}

executar()