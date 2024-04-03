const { User } = require('../models/user');
const bcrypt = require('bcrypt');

module.exports = {
    // Lista todos os usuários utilizando Sequelize
    listAllUsers: async (req, res) => {
        try {
            const users = await User.findAll({
                attributes: { exclude: ['password'] } // Exclui a senha da saída
            });
            res.json(users);
        } catch (error) {
            res.status(500).send({ message: "Erro ao buscar os usuários!", error: error.toString() });
        }
    },

    // Registra um novo usuário utilizando Sequelize
    registerUser: async (req, res) => {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const newUser = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            });
            res.status(201).json({ id: newUser.id, name: newUser.name, email: newUser.email });
        } catch (error) {
            res.status(500).send({ message: "Erro ao criar o usuário!", error: error.toString() });
        }
    },
    // Login de usuário com verificação de senha
    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email } });

            if (!user) {
                return res.status(404).send({ message: "Usuário não encontrado!" });
            }

            // Verificando a senha
            const match = await bcrypt.compare(password, user.password);

            if (match) {
                res.send({ message: "Login bem-sucedido!" });
                // Aqui, você pode querer criar e enviar um token JWT ou outra forma de sessão
            } else {
                res.status(401).send({ message: "Senha incorreta!" });
            }
        } catch (error) {
            res.status(500).send({ message: "Erro ao tentar fazer login!" });
        }
    },

    // Obtém detalhes de um usuário específico
    getUserDetails: async (req, res) => {
        try {
            const user = await User.findByPk(req.params.userId, {
                attributes: { exclude: ['password'] } // Exclui a senha da saída
            });
            user ? res.json(user) : res.status(404).send({ message: "Usuário não encontrado!" });
        } catch (error) {
            res.status(500).send({ message: "Erro ao buscar o usuário!", error: error.toString() });
        }
    },
    // Atualiza um usuário
    updateUser: async (req, res) => {
        try {
            const { nome, email } = req.body;
            const [updated] = await User.update({ nome, email }, { where: { id: req.params.userId } });
            updated ? res.send({ message: "Usuário atualizado com sucesso!" }) : res.status(404).send({ message: "Usuário não encontrado!" });
        } catch (error) {
            res.status(500).send({ message: "Erro ao atualizar o usuário!", error: error.toString() });
        }
    },

    // Deleta um usuário utilizando Sequelize
    deleteUser: async (req, res) => {
        try {
            const numDeleted = await User.destroy({ where: { id: req.params.userId } });
            numDeleted ? res.send({ message: "Usuário deletado com sucesso!" }) : res.status(404).send({ message: "Usuário não encontrado!" });
        } catch (error) {
            res.status(500).send({ message: "Erro ao deletar o usuário!", error: error.toString() });
        }
    },
    mostrarPerfil: async (req, res) => {
        try {
            const user = await User.findByPk(req.params.id);
            user ? res.render('users/perfil', { user }) : res.status(404).send({ message: "Usuário não encontrado!" });
        } catch (error) {
            res.status(500).send({ message: "Erro ao buscar o usuário!" });
        }
    },

    atualizarUsuario: async (req, res) => {
        try {
            const { nome, email } = req.body; // Capture e valide os campos conforme necessário
            const [updated] = await User.update({ nome, email }, { where: { id: req.params.id } });
            if (updated) {
                res.redirect('/users/perfil/' + req.params.id);
            } else {
                res.status(404).send({ message: "Usuário não encontrado para atualizar!" });
            }
        } catch (error) {
            res.status(500).send({ message: "Erro ao atualizar o usuário!" });
        }
    },
    // Implemente as demais funções como loginUser, getUserDetails, deleteUser, adaptando-as para usar Sequelize conforme necessário.
};
