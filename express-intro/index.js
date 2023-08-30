// importando a biblioteca express
const express = require("express")

// instanciando o aplicativo
const app = express()

// configurando o ejs
app.set("view engine", "ejs")

// rota para a raiz do projeto
app.get("/", (req, res) => {
    res.send("Ola mundo express!")
})

// rota para o site com arquivo html estático
app.get("/site", (req, res) => {
    // renderizando um arquivo html
    res.sendFile(__dirname + '/index.html')
})

// rota para o site usando ejs
app.get("/site2", (req, res) => {
    // obtém o parâmetro passado na query string
    const { count } = req.query 
    // constrói o html a partir de um template e devolve para ser renderizado.
    // no segundo parâmetro é enviado um objeto contendo os dados para a página
    res.render("index", {usuario: "josecarlos2", count})
})

// configurando aplicativo para funcionar na porta 3000
app.listen(3000, (err) => {
    // verificando se existe um erro e printando na tela
    if(err){
        console.log("Erro ao subir aplicação")
        return
    }

    console.log(`Escutando na porta ${3000}`)
})