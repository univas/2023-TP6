// Importando biblioteca express
const express = require("express")

// Cria a aplicação
const app = express()

// Configurar EJS como engine padrão
app.set("view engine", "ejs")

// Definir como o corpo da requisição será tratado
app.use(express.urlencoded())

// mapear uma rota com get
app.get("/", (req, res) => {
    res.render("login", {erro: null})
})

// mapear uma rota com post
app.post("/", (req, res) => {
    const {usuario, senha} = req.body

    if(usuario == "teste" && senha == "teste"){
        res.render("sucesso")
    }else{
        res.render("login", {erro: "Usuário e senha inválidos!"})
    }
    
})

// Definir a porta que a aplicação vai funcionar
app.listen(3000, (err) => {
    if(err){
        console.log("Erro ao subir aplicação");
    }else{
        console.log("Aplicação executando na porta 3000")
    }
})