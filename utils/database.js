const Sequelize = require('sequelize')

const sequelize = new Sequelize('store', 'root', '9926551180', {
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize;