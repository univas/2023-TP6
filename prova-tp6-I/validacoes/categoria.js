const validar = (dados) => {
    if(!(dados.nome && dados.nome.length > 0 && dados.nome != "")){
        return false
    }else{
        return true
    }
}

module.exports = validar