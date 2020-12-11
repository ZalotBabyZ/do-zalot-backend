module.exports = (sequelize, DataTypes) => {
  const Assign = sequelize.define(
    'Assign',
    {
      user_status: {
        type: DataTypes.ENUM(['UNDERTAKE', 'ABOLISH']),
      },
    },
    {
      tableName: 'assigns',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );

  Assign.associate = (models) => {
    Assign.belongsTo(models.List, { foreignKey: 'list_id', allowNull: false, onDelete: 'cascade' });
    Assign.belongsTo(models.User, { foreignKey: 'user_id', allowNull: false, onDelete: 'restrict' });
  };

  return Assign;
};
