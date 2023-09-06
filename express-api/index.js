const express = require("express")
const porta = 3124

const usuarios_db = [
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

const app = express()

// Definir que os dados enviados serão no formato json no corpo da requisição
app.use(express.json())

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

    // inserir o novo id ao usuário criado
    usuario_novo.id = ultimo_id + 1

    // inserir o usuário no array
    usuarios_db.push(usuario_novo)

    // enviar a resposta
    res.send(usuario_novo)
})

app.listen(porta, (err) => {
    if(err){
        console.log("Erro ao subir aplicação")
    }else{
        console.log(`Aplicação executando na porta ${porta}`)
    }
})