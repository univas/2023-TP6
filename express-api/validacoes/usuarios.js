const validar = (usuario) => {
    // nome, login, email e senha são obrigatórios
    // Validações
    const erros = []

    if(!usuario.nome || usuario.nome == ""){
        erros.push("Campo nome não pode ser vazio.")
    }

    if(!usuario.login || usuario.login == ""){
        erros.push("Campo login não pode ser vazio.");
    }

    if(!usuario.email || usuario.email == ""){
        erros.push("Campo e-mail não pode ser vazio.")
    }else if(!usuario.email.includes("@")){
        erros.push("Campo e-mail deve conter um e-mail válido.")
    }

    if(!usuario.senha || usuario.senha == ""){
        erros.push("Campo senha não pode ser vazio.")
    }else if(usuario.senha.length < 6){
        erros.push("A senha deve ter no mínimo 06 caracteres.")
    }

    // Se existe campo inválido
    if(erros.length > 0){
        throw new Error(JSON.stringify({
            status: 400,
            erros
        }))
    }else{
        return true
    }
}

module.exports = validar