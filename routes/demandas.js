const express = require('express');
const router = express.Router();
const demandasController = require('../controllers/demandasController');
const { verifyToken, authorizeRoles, roles } = require('../middleware/auth');

// Rota para listar todas as demandas - agora com autenticação e autorização aplicadas
router.get('/', verifyToken, authorizeRoles(roles.Gerente, roles.Admin), demandasController.listAllDemandas);

// Rota GET para exibir a página de detalhes de uma demanda - considerando se detalhes de demandas requerem autenticação/autorização
router.get('/detalhes/:id', verifyToken, demandasController.mostrarDetalhes);

// Rota POST para atualizar a demanda - pode requerer autenticação e autorização, ajuste conforme necessário
router.post('/update/:id', verifyToken, authorizeRoles(roles.Gerente, roles.Admin), demandasController.atualizarDemanda);

// Rota para criar uma nova demanda - com autenticação e autorização aplicadas
router.post('/', verifyToken, authorizeRoles(roles.Gerente, roles.Admin), demandasController.createDemanda);

// Rota para obter detalhes de uma demanda específica - considere se essa rota requer autenticação/autorização
router.get('/:demandaId', verifyToken, demandasController.getDemandaDetails);

// Rota para atualizar uma demanda - pode requerer autenticação e autorização, ajuste conforme necessário
router.put('/:demandaId', verifyToken, authorizeRoles(roles.Gerente, roles.Admin), demandasController.updateDemanda);

// Rota para deletar uma demanda - com autenticação e autorização aplicadas
router.delete('/:demandaId', verifyToken, authorizeRoles(roles.Gerente, roles.Admin), demandasController.deleteDemanda);

// Rota para atribuir uma demanda a um usuário - considerando a lógica de negócios, ajuste conforme necessário
router.post('/:demandaId/assign/:userId', verifyToken, authorizeRoles(roles.Gerente, roles.Admin), demandasController.assignDemandaToUser);

module.exports = router;
