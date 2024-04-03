const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract Bearer Token

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado. Nenhum token fornecido.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Adicionar usuário decodificado ao req
        next();
    } catch (error) {
        return res.status(400).json({ message: 'Token inválido.' });
    }
};

const roles = {
    Admin: 'Admin',
    Gerente: 'Gerente',
    Funcionario: 'Funcionario'
};

const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Acesso negado. Permissão insuficiente.' });
        }
        next();
    };
};

module.exports = { verifyToken, authorizeRoles, roles };
