const { produtoRepositorio } = require('../repositorios/produto')
const repositorio = produtoRepositorio()

const Router = require('express').Router()

Router.get('/produtos/:id', (req, res) => {
    try{
        const {id} = req.params

        const produto = repositorio.get(id)

        res.send(produto)
    }catch(err){
        const dadosDoErro = JSON.parse(err.message)

        res.status(dadosDoErro.status).send(dadosDoErro.msg)
    }
})

Router.post("/produtos", (req, res) => {
    try{
        const dados = req.body

        const produtoCriado = repositorio.create(dados)
    
        res.send(produtoCriado)
    }catch(err){
        res.status(400).send(err.message)
    } 
})

Router.delete("/produtos/:id", (req, res) => {
    try{
        const {id} = req.params

        repositorio.destroy(id)

        res.status(204).send()
    }catch(err){
        res.status(400).send(err.message)
    }
})

module.exports = Router