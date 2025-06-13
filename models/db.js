const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('cadastros_0arg', 'cadastros_0arg_user', 'nZBY7vO1uEJ6D4b8giMSUCukT8uV9NA4', {
  host: 'dpg-d0p4iueuk2gs7399poj0-a',
  port: 5432,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  logging: false
});

module.exports = { Sequelize, sequelize };

sequelize.authenticate()
  .then(() => {
    console.log('Conexão com PostgreSQL estabelecida com sucesso!');
  })
  .catch((err) => {
    console.error('Erro ao conectar ao banco:', err);
  });
