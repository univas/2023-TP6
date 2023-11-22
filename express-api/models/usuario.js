const {Sequelize, DataTypes} = require('sequelize')

const sequelize = new Sequelize('sqlite::memory:')

const Usuario = sequelize.define('Usuario', {
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    login: DataTypes.STRING,
    senha: DataTypes.STRING
})

sequelize.sync()

module.exports = Usuario