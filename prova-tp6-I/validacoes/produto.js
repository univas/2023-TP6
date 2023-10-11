const validar = (dados) => {
    let valido = true

    if(!dados.nome){
        valido = false
    }

    if(!dados.preco){
        valido = false
    }

    if(!dados.peso){
        valido = false
    }

    if(!dados.cor){
        valido = false
    }

    if(!dados.marca){
        valido = false
    }

    return valido
}

module.exports = validar