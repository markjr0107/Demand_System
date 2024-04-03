const rateLimit = require('express-rate-limit');

const apiRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: (req, res) => req.user ? 200 : 100, // Usuários autenticados têm um limite maior
    message: 'Excedeu o limite de requisições. Por favor, tente novamente mais tarde.',
    standardHeaders: true, // Retorna informações do limite de taxa nos cabeçalhos `RateLimit-*`
    legacyHeaders: false, // Desabilita os cabeçalhos `X-RateLimit-*`
    onLimitReached: (req, res, options) => {
        console.log(`Limitação de taxa atingida para ${req.ip}`);
    },
});

module.exports = apiRateLimiter;

