const { Demanda } = require('../models/demanda');

module.exports = {
    // Lista todas as demandas
    async listAllDemandas(req, res) {
        try {
            const demandas = await Demanda.findAll();
            res.json(demandas);
        } catch (error) {
            res.status(500).send({ message: 'Erro ao buscar as demandas.', error: error.toString() });
        }
    },

    // Cria uma nova demanda
    async createDemanda(req, res) {
        try {
            const { title, description, status } = req.body;
            const newDemanda = await Demanda.create({ title, description, status });
            res.status(201).json(newDemanda);
        } catch (error) {
            res.status(500).send({ message: 'Erro ao criar a demanda.', error: error.toString() });
        }
    },

    // Obtém detalhes de uma demanda específica
    async getDemandaDetails(req, res) {
        try {
            const demanda = await Demanda.findByPk(req.params.demandaId);
            if (demanda) {
                res.json(demanda);
            } else {
                res.status(404).send({ message: "Demanda não encontrada!" });
            }
        } catch (error) {
            res.status(500).send({ message: 'Erro ao buscar a demanda.', error: error.toString() });
        }
    },

    // Atualiza uma demanda
    async updateDemanda(req, res) {
        try {
            const { title, description, status } = req.body;
            const [updatedRows] = await Demanda.update({ title, description, status }, { where: { id: req.params.demandaId } });
            
            if (updatedRows > 0) {
                res.send({ message: "Demanda atualizada com sucesso!" });
            } else {
                res.status(404).send({ message: "Demanda não encontrada!" });
            }
        } catch (error) {
            res.status(500).send({ message: 'Erro ao atualizar a demanda.', error: error.toString() });
        }
    },

    // Deleta uma demanda
    async deleteDemanda(req, res) {
        try {
            const numDeletedRows = await Demanda.destroy({ where: { id: req.params.demandaId } });
            
            if (numDeletedRows > 0) {
                res.send({ message: "Demanda deletada com sucesso!" });
            } else {
                res.status(404).send({ message: "Demanda não encontrada!" });
            }
        } catch (error) {
            res.status(500).send({ message: 'Erro ao deletar a demanda.', error: error.toString() });
        }
    },

    // Atribui uma demanda a um usuário
    async assignDemandaToUser(req, res) {
        // A implementação desse método depende das relações e lógicas específicas do seu banco de dados
        res.send({ message: "Método de atribuição de demanda a um usuário ainda não implementado." });
    }
};
