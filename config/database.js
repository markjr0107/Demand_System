require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'mysql',
  logging: !isProduction, // Desabilita o logging no ambiente de produção
  pool: {
    max: 5, // Número máximo de conexões no pool
    min: 0, // Número mínimo de conexões no pool
    acquire: 30000, // Tempo máximo, em milissegundos, que o pool tentará obter conexão antes de lançar erro
    idle: 10000, // Tempo máximo, em milissegundos, que uma conexão pode estar ociosa antes de ser liberada
  },
  // Adicionar mais opções de configuração conforme necessário
});

// Testando a conexão com o banco de dados
async function testDatabaseConnection() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados foi estabelecida com sucesso.');
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error);
  }
}

testDatabaseConnection();

module.exports = sequelize;
