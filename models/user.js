const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = new Sequelize(process.env.DATABASE_URL); // Ajuste conforme sua configuração

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "O nome é obrigatório" },
      notEmpty: { msg: "O nome não pode ser vazio" }
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: { msg: "Deve ser um email válido" },
      notNull: { msg: "O email é obrigatório" },
      notEmpty: { msg: "O email não pode ser vazio" }
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { msg: "A senha é obrigatória" },
      notEmpty: { msg: "A senha não pode ser vazia" },
      len: [8, 50], // Senhas devem ter entre 8 e 50 caracteres
    }
  },
  role: {
    type: DataTypes.ENUM,
    values: ['Gerente', 'Admin', 'Funcionário'],
    allowNull: false,
    defaultValue: 'Funcionário',
    validate: {
      isIn: {
        args: [['Gerente', 'Admin', 'Funcionário']],
        msg: "O papel do usuário deve ser Gerente, Admin ou Funcionário"
      }
    }
  }
}, {
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSaltSync(10, 'a');
        user.password = bcrypt.hashSync(user.password, salt);
      }
    },
    beforeUpdate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSaltSync(10, 'a');
        user.password = bcrypt.hashSync(user.password, salt);
      }
    }
  },
  sequelize,
  modelName: 'User'
});

module.exports = User;
