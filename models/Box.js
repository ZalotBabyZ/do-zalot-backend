module.exports = (sequelize, DataTypes) => {
  const Box = sequelize.define(
    'Box',
    {
      box_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      type: {
        type: DataTypes.ENUM(['TODO', 'DOING', 'DONE', 'NOTE', 'VOTE']),
      },
      box_color: {
        type: DataTypes.STRING,
        defaultValue: 'var(--primary-color)',
      },
      project_pin: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      order: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'boxes',
      timestamps: false,
    }
  );

  Box.associate = (models) => {
    Box.belongsTo(models.Project, { foreignKey: 'project_id', allowNull: false, onDelete: 'cascade' });
    Box.hasMany(models.List, { foreignKey: 'box_id', allowNull: false, onDelete: 'cascade' });
  };

  return Box;
};
