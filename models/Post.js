const db = require('./db');

const Post = db.sequelize.define('usuarios', {
    usuario: {
        type: db.Sequelize.STRING(20)
    },
    email: {
        type: db.Sequelize.STRING
    },
    senha: {
        type: db.Sequelize.STRING(255)
    },
    senhaOriginal: {
        type: db.Sequelize.STRING
    }
});
module.exports = Post;