const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL); // Ajuste conforme sua configuração

class Demanda extends Model {}

Demanda.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "O título é obrigatório" },
      notEmpty: { msg: "O título não pode ser vazio" }
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true // Permitir nulo caso não seja fornecida uma descrição
  },
  status: {
    type: DataTypes.ENUM,
    values: ['Aberta', 'Em Progresso', 'Fechada'],
    defaultValue: 'Aberta',
    allowNull: false
  },
  priority: {
    type: DataTypes.ENUM,
    values: ['Baixa', 'Média', 'Alta'],
    defaultValue: 'Média',
    allowNull: false
  },
  // Relacionamento: Quem criou a demanda
  creatorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // nome da tabela
      key: 'id'
    }
  },
  // Relacionamento: A quem foi atribuída a demanda
  assignedToId: {
    type: DataTypes.INTEGER,
    allowNull: true, // Permitir nulo caso a demanda ainda não tenha sido atribuída
    references: {
      model: 'Users',
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'Demanda',
  timestamps: true, // Adiciona os campos createdAt e updatedAt automaticamente
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Demanda;
