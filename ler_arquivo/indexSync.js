const fs = require("fs")

const arquivo = fs.readFileSync('./nomes.txt', 'utf8')

const nomes = arquivo.split("\r\n")

nomes.forEach((nome, index) => {
    console.log(`${index} ${nome}`)
})