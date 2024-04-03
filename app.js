const express = require('express');
require('dotenv').config(); // Carrega as variáveis de ambiente do .env uma vez no início
const cors = require('cors');
const morgan = require('morgan');
const { Sequelize, DataTypes } = require('sequelize');

// Importação dos middlewares customizados
const { verifyToken, authorizeRoles, roles } = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');
const apiRateLimiter = require('./middleware/rateLimiter');

// Configuração do Sequelize com especificação do dialeto MySQL
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'mysql', // Especifica o dialeto aqui
});

// Importação dos modelos
const User = require('./models/user')(sequelize, DataTypes);
const Demanda = require('./models/demanda')(sequelize, DataTypes);

// Configuração dos modelos e associações
const models = { User, Demanda };
require('./models/associations')(models); // Utilizando a função ajustada para associações

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Habilita CORS
app.use(morgan('dev')); // Logging com Morgan
app.use(express.json()); // Para parsear application/json
app.use(express.urlencoded({ extended: true })); // Para parsear application/x-www-form-urlencoded
app.use(apiRateLimiter); // Aplica o limitador de taxa globalmente

// Configuração para servir arquivos estáticos da pasta 'public'
app.use(express.static('public'));

// Middleware para anexar os modelos ao req
app.use((req, res, next) => {
    req.models = models;
    next();
});

// Importação das rotas
const userRoutes = require('./routes/users')(models); // Assegure-se de que suas rotas estão configuradas para receber 'models'
const demandaRoutes = require('./routes/demandas')(models);

// Aplicação dos middlewares de autenticação e autorização nas rotas
app.use('/users', userRoutes);
app.use('/demandas', demandaRoutes);

// Exemplo de rotas protegidas com autenticação e autorização
// Nota: Estas linhas são comentadas porque precisam de uma adaptação nas suas rotas para funcionar corretamente.
// app.get('/api/demandas', verifyToken, authorizeRoles(roles.Gerente, roles.Admin), demandaController.listAll);
// app.post('/api/demandas', verifyToken, authorizeRoles(roles.Gerente, roles.Admin), demandaController.create);

// Rota raiz
app.get('/', (req, res) => {
    res.send('Bem-vindo ao Sistema de Gestão de Demandas JJ!');
});

// Middleware para tratamento de erro 404 - Rota não encontrada
app.use((req, res, next) => {
    res.status(404).send("Desculpe, não conseguimos encontrar isso!");
});

// Middleware para tratamento de erros - Deve ser o último middleware adicionado
app.use(errorHandler);

// Inicia o servidor
app.listen(PORT, async () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    try {
        await sequelize.authenticate();
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
    } catch (error) {
        console.error('Não foi possível conectar ao banco de dados:', error);
    }
});
