const fs = require('fs')

fs.readFile('./arquivo1.txt', {encoding: 'utf8'}, (err, data) => {
    if(err){
        return console.log("Impossível abrir o arquivo para leitura.")
    }
    const nomes = data.split('\n')

    console.log("Mostrando todos os nomes")
    mostrarTudo(nomes)

    mostrarNomesComLetraInicial(nomes, 'j')
})


const mostrarTudo = (lista) => {
    if(!Array.isArray(lista)){
        return console.log("Não foi enviada uma lista de nomes.")
    }

    if(lista.length == 0){
        return console.log("A lista está vazia.")
    }

    lista.forEach((nome, index) => {
        let ordem = new String(index+1)
        ordem = ordem.padStart(2, '0')
        console.log(`Nome ${ordem}: ${nome}`)
    })
}

const mostrarNomesComLetraInicial = (lista, letraInicial) => {
    if(!letraInicial || letraInicial.length == 0 || letraInicial.length > 1){
        return console.log("Não foi enviada uma letra para filtrar.")
    }
    console.log(`Mostrando nomes que começam com a letra '${letraInicial.toUpperCase()}'`)
    if(!Array.isArray(lista)){
        return console.log("Não foi enviada uma lista de nomes.")
    }

    if(lista.length == 0){
        return console.log("A lista está vazia.")
    }

    const nomesFiltrados = lista.filter(nome => {
        return nome.startsWith(letraInicial.toUpperCase()) || nome.startsWith(letraInicial.toLowerCase())
    })

    mostrarTudo(nomesFiltrados)
}

