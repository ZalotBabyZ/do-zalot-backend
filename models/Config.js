module.exports = (sequelize, DataTypes) => {
  const Config = sequelize.define(
    'Config',
    {
      editable_score: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      editable_config: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      editable_assign: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      regressable: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      expelable: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      project_color: {
        type: DataTypes.STRING,
      },
      project_deadline: {
        type: DataTypes.DATEONLY,
      },
    },
    {
      tableName: 'configs',
      timestamps: false,
    }
  );

  Config.associate = (models) => {
    Config.belongsTo(models.Project, { foreignKey: 'project_id', allowNull: false, onDelete: 'cascade' });
    Config.belongsTo(models.User, { foreignKey: 'delete_right', onDelete: 'SET NULL' });
    Config.belongsTo(models.User, { foreignKey: 'edit_config_right', onDelete: 'SET NULL' });
    Config.belongsTo(models.User, { foreignKey: 'edit_score_right', onDelete: 'SET NULL' });
    Config.belongsTo(models.User, { foreignKey: 'edit_assign_right', onDelete: 'SET NULL' });
    Config.belongsTo(models.User, { foreignKey: 'regress_right', onDelete: 'SET NULL' });
    Config.belongsTo(models.User, { foreignKey: 'expel_right', onDelete: 'SET NULL' });
    Config.belongsTo(models.User, { foreignKey: 'approve_by_a', onDelete: 'SET NULL' });
    Config.belongsTo(models.User, { foreignKey: 'approve_by_b', onDelete: 'SET NULL' });
    Config.belongsTo(models.User, { foreignKey: 'approve_by_c', onDelete: 'SET NULL' });
  };

  return Config;
};
