
module.exports = (models) => {
    const { User, Demanda } = models;

    // Definindo associações
    User.hasMany(Demanda, { foreignKey: 'creatorId', as: 'CreatedDemandas' });
    Demanda.belongsTo(User, { as: 'Creator', foreignKey: 'creatorId' });

    User.hasMany(Demanda, { foreignKey: 'assignedToId', as: 'AssignedDemandas' });
    Demanda.belongsTo(User, { as: 'AssignedTo', foreignKey: 'assignedToId' });
};

