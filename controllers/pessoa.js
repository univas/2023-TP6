const repositorio = require('../repositorios/pessoa.js')

const controller = {
    get: (req, res) => {
        res.send(repositorio.getAll())
    },
    getById: (req, res) => {
        const {id} = req.params

        res.send(repositorio.getById(id))
    },
    create: (req, res) => {
        try{
            const dados = req.body

            const pessoaCadastrada = repositorio.create(dados)

            res.send(pessoaCadastrada)
        }catch(err){
            res.status(400).send(err.message)
        }
    },
    update: (req, res) => {
        try{
            const {id} = req.params
            const dados = req.body

            const pessoaAtualizada = repositorio.update(dados, id)

            res.send(pessoaAtualizada)
        }catch(err){
            res.status(400).send(err.message)
        }
    },
    destroy: (req, res) => {
        const {id} = req.params

        repositorio.destroy(id)

        res.end()
    }
}

module.exports = controller