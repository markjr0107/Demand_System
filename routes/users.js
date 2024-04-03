const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// Rota para listar todos os usuários
router.get('/', usersController.listAllUsers);

// Rota GET para exibir o perfil do usuário
router.get('/perfil/:id', usersController.mostrarPerfil);

// Rota POST para atualizar o usuário
router.post('/update/:id', usersController.atualizarUsuario);

// Rota para registrar um novo usuário
router.post('/register', usersController.registerUser);

// Rota para login de usuário
router.post('/login', usersController.loginUser);

// Rota para obter detalhes de um usuário específico
router.get('/:userId', usersController.getUserDetails);

// Rota para atualizar um usuário
router.put('/:userId', usersController.updateUser);

// Rota para deletar um usuário
router.delete('/:userId', usersController.deleteUser);

module.exports = router;
