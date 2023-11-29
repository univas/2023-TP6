const validador = (pessoa) => {
    if(!pessoa.email || pessoa.email.length == 0){
        throw new Error("É preciso enviar o email")
    }

    if(!pessoa.nome || pessoa.nome.length == 0){
        throw new Error("É preciso enviar o nome")
    }
}

module.exports = validador