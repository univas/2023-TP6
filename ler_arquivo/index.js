const fs = require('fs')

const lerArquivo = (nome) => {
    return new Promise((resolve, reject) => {
        fs.readFile(nome, {encoding: 'utf8'},(err, arquivo) => {
            if(err){
                reject(err)
            }else{
                resolve(arquivo.split('\r\n'))
            }
        })
    })
}

async function executar(){
    try{
        const resultado = await lerArquivo('./nomes.txt')
        resultado.forEach((nome, index) => {
            let ordem = new String(index+1)
            ordem = ordem.padStart(2, '0')
            let complemento = ""
            if(nome.startsWith("M")){
                complemento = "##"
            }
            console.log(`Nome da pessoa ${ordem}: ${complemento} ${nome} ${complemento}`)
        })
    }catch(err){
        console.log("Impossível ler o arquivo.")
    }
}

executar()

// lerArquivo('./nomes.txt')
// .then(arquivo => {
//     arquivo.forEach((nome, index) => {
//         let ordem = new String(index+1)
//         ordem = ordem.padStart(2, '0')
//         console.log(`Nome da pessoa ${ordem}: ${nome}`)
//     })
// }).catch(err => {
//     console.log("Impossível ler o arquivo.")
// })


// fs.readFile('./nomes.txt', {encoding: 'utf8'},(err, arquivo) => {
//     if(err){
//         console.log("Impossível ler o arquivo.")
//     }else{
//         const nomes = arquivo.split('\r\n')

//         nomes.forEach((nome, index) => {
//             let ordem = new String(index+1)
//             ordem = ordem.padStart(2, '0')
//             console.log(`Nome da pessoa ${ordem}: ${nome}`)
//         })
//     }
// })