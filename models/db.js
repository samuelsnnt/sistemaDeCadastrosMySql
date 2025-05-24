const Sequelize = require('sequelize');
const sequelize = new Sequelize('cadastros', 'root', '2025', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}

sequelize.authenticate().then(function(){
    console.log('Servidor ligado com sucesso!')
}).catch(function(erro){
    console.log('Servidor não iniciado:'+erro)
});