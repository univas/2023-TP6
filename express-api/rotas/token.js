const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

const usuario_repositorio = require("../repositorios/usuarios")

const rotas_token = () => {

    router.post("/token", (req, res) => {
        // #swagger.tags = ['Autenticação']
        try{
            const {usuario, senha} = req.body

            if(!usuario || !senha){
                return res.status(401).send("Deve ser enviado um usuário e senha válidos!")
            }

            const dadosUsuario = usuario_repositorio.buscarUsuarioPorLoginESenha(usuario, senha)

            const token = jwt.sign({ usuario: dadosUsuario }, process.env.APP_KEY)

            return res.send(token)
        }catch(err){
            return res.status(401).send("Usuário e/ou senha inválidos!")
        }
    })

    router.use((req, res, next) => {
        console.log('TOKEN Time:', Date.now())
        next()
    })

    return router
}

module.exports = rotas_token