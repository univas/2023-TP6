const Router = require("express").Router()
const repositorio = require("../repositorios/categoria").repositorioCategorias()

Router.get("/categorias/:id", (req, res) => {
    try{
        const {id} = req.params
        const categoria = repositorio.get(id)

        res.send(categoria)
    }catch(err){
        const dadosDoErro = JSON.parse(err.message)
        res.status(dadosDoErro.status).send(dadosDoErro.mensagem)
    }
})

Router.get("/categorias", (req, res) => {
    const parametros = {}

    if(req.query.nome){
        parametros.nome = req.query.nome
    }

    const categorias = repositorio.getAll(parametros)

    res.send(categorias)
})

Router.post("/categorias", (req, res) => {
    try{
        const dados = req.body

        const categoria_cadastrada = repositorio.create(dados)

        res.send(categoria_cadastrada)
    }catch(err){
        const dadosDoErro = JSON.parse(err.message)
        res.status(dadosDoErro.status).send(dadosDoErro.mensagem)
    }
    
})

Router.put("/categorias/:id", (req, res) => {
    
    try{
        const {id} = req.params
        const dados = req.body

        const categoria_atualizada = repositorio.update(dados, id)

        res.send(categoria_atualizada)
    }catch(err){
        const dadosDoErro = JSON.parse(err.message)
        res.status(dadosDoErro.status).send(dadosDoErro.mensagem)
    }
})

Router.delete("/categorias/:id", (req, res) => {
    try{
        const {id} = req.params
        repositorio.destroy(id)

        res.status(204).send()
    }catch(err){
        const dadosDoErro = JSON.parse(err.message)
        res.status(dadosDoErro.status).send(dadosDoErro.mensagem)
    }
})

module.exports = Router