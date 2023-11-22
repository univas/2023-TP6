const app = require("./app.js")
// Definição da porta
const porta = process.env.PORTA

// Iniciando aplicação
app.listen(porta, (err) => {
    if(err){
        console.log("Erro ao subir aplicação")
    }else{
        console.log(`Aplicação executando na porta ${porta}`)
    }
})