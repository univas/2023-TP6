// Importação do Express
const express = require("express")
// Definição da porta
const porta = 3124

// Banco de dados em memória
let usuarios_db = [
    {
        nome: "marcos",
        login: "marcosantonio",
        senha: "123456",
        email: "marcosantonio@univas.edu.br",
        id: 1
    },
    {
        nome: "João da Silva",
        login: "joaosilva",
        senha: "654321",
        email: "joaosilva@univas.edu.br",
        id: 2
    }
]

// Instanciando a aplicação
const app = express()

// Definir que os dados enviados serão no formato json no corpo da requisição
app.use(express.json())

// rota raiz
app.get("/", (req, res) => {
    res.send("API executando...")
})

// rota de obter usuarios
app.get("/usuarios", (req, res) => {
    // criando novo array com os usuarios sem a senha
    const usuarios_sem_senha = usuarios_db.map((usuario) => {
        return {
            nome: usuario.nome,
            login: usuario.login,
            email: usuario.email,
            id: usuario.id
        }
    })

    // enviando os usuarios
    res.send(usuarios_sem_senha)
})

// rota para obter um unico usuario pelo id
app.get("/usuarios/:id", (req, res) => {
    // capturei o parametro enviado na requisição
    const id = req.params.id

    // filtrei todos os usuarios que atendem ao id passado
    const usuarios_filtrados = usuarios_db.filter(usuario => {
        return usuario.id == id
    })

    if(usuarios_filtrados.length == 0){
        return res.status(404).send()
    }

    // peguei o primeiro usuario da lista
    const usuario = usuarios_filtrados[0]

    // enviei como resposta um objeto sem a senha do usuario
    res.send({
        nome: usuario.nome,
        login: usuario.login,
        email: usuario.email,
        id: usuario.id
    })
})

// rota para criar um usuário novo
app.post("/usuarios", (req, res) => {
    // buscar o último id criado
    const ultimo_id = usuarios_db.reduce((anterior, proximo) => {
        if(proximo.id > anterior){
            return proximo.id
        }else{
            return anterior
        }
    }, 0)

    // criar o novo usuário
    const usuario_novo = req.body

    // nome, login, email e senha são obrigatórios
    // Validações
    const erros = []

    if(!usuario_novo.nome || usuario_novo.nome == ""){
        erros.push("Campo nome não pode ser vazio.")
    }

    if(!usuario_novo.login || usuario_novo.login == ""){
        erros.push("Campo login não pode ser vazio.");
    }

    if(!usuario_novo.email || usuario_novo.email == ""){
        erros.push("Campo e-mail não pode ser vazio.")
    }else if(!usuario_novo.email.includes("@")){
        erros.push("Campo e-mail deve conter um e-mail válido.")
    }

    if(!usuario_novo.senha || usuario_novo.senha == ""){
        erros.push("Campo senha não pode ser vazio.")
    }else if(usuario_novo.senha.length < 6){
        erros.push("A senha deve ter no mínimo 06 caracteres.")
    }

    // Se existe campo inválido
    if(erros.length > 0){
        return res.status(400).send(erros)
    }

    // inserir o novo id ao usuário criado
    usuario_novo.id = ultimo_id + 1

    // inserir o usuário no array
    usuarios_db.push(usuario_novo)

    // enviar a resposta
    res.send(usuario_novo)
})

// rota para atualizar os dados de um usuário PUT
app.put("/usuarios/:id", (req, res) => {
    // obtendo o parametro id enviado por meio de uma desestruturação
    const {id} = req.params

    // busca o usuário pelo ID
    const usuarios_filtrados = usuarios_db.filter(u =>{
        return u.id == id
    })

    // Verifica se o usuário existe
    if(usuarios_filtrados.length == 0){
        // Se não existir devolve erro 404
        return res.status(404).send()
    }

    // atualiza os dados do usuário buscado
    const usuario = usuarios_filtrados[0]
    usuario.email = req.body.email
    usuario.login = req.body.login
    usuario.nome = req.body.nome
    usuario.senha = req.body.senha

    // retorna com sucesso
    return res.send(usuario)

})

// rota para atualizar os dados de um usuário, considerando apenas os que foram enviados
app.patch("/usuarios/:id", (req, res) => {
    // obtendo o parametro id enviado por meio de uma desestruturação
    const {id} = req.params

    // busca o usuário pelo ID
    const usuarios_filtrados = usuarios_db.filter(u =>{
        return u.id == id
    })

    // Verifica se o usuário existe
    if(usuarios_filtrados.length == 0){
        // Se não existir devolve erro 404
        return res.status(404).send()
    }

    // atualiza os dados do usuário buscado
    const usuario = usuarios_filtrados[0]
    usuario.email = req.body.email ?? usuario.email
    usuario.login = req.body.login ?? usuario.login
    usuario.nome = req.body.nome ?? usuario.nome
    usuario.senha = req.body.senha ?? usuario.senha

    // retorna com sucesso
    return res.send(usuario)
})

// rota para excluir um usuário da base DELETE
app.delete("/usuarios/:id", (req, res) => {
    // obtendo parametro id enviado por meio de desestruturação
    const {id} = req.params

    // obtendo o usuário pelo ID
    const usuarios_filtrados = usuarios_db.filter(u => u.id == id)

    // verificando se o usuário existe
    if(usuarios_filtrados.length == 0){
        // se não existir, devolve um erro 404 pro cliente.
        return res.status(404).send()
    }

    // cria um novo array sem o usuário que deve ser excluído
    usuarios_db = usuarios_db.filter(u => u.id != id)

    return res.status(200).send()
})

// Iniciando aplicação
app.listen(porta, (err) => {
    if(err){
        console.log("Erro ao subir aplicação")
    }else{
        console.log(`Aplicação executando na porta ${porta}`)
    }
})