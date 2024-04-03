const errorHandler = (err, req, res, next) => {
    console.error(`[Error] ${req.method} ${req.url} | ${err.stack}`);

    // Erros de validação do Sequelize
    if (err.name === 'SequelizeValidationError') {
        const messages = err.errors.map(error => error.message);
        return res.status(400).send({ message: 'Erros de validação ocorreram', errors: messages });
    }

    // Erro personalizado para limitação de taxa
    if (err.message === 'Excedeu o limite de requisições') {
        return res.status(429).send({ message: err.message });
    }

    // Erros internos não capturados
    res.status(500).send({ message: 'Algo deu errado!', error: err.message });
};

module.exports = errorHandler;
