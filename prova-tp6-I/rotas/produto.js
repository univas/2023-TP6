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

module.exports = Router