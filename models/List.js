module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define(
    'List',
    {
      list: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      type: {
        type: DataTypes.ENUM(['TODO', 'NOTE', 'PICTURE', 'VOTE']),
      },
      status: {
        type: DataTypes.ENUM(['TODO', 'DOING', 'DONE', 'NOTHING']),
      },
      important: {
        type: DataTypes.ENUM(['IMPORTANT', 'MUST', 'MAY', 'NOTHING']),
      },
      score: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      project_pin: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      order: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      list_deadline: {
        type: DataTypes.DATEONLY,
      },
    },
    {
      tableName: 'lists',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );

  List.associate = (models) => {
    List.belongsTo(models.Box, { foreignKey: 'box_id', allowNull: false, onDelete: 'cascade' });
    List.belongsTo(models.Project, { foreignKey: 'project_id', allowNull: false, onDelete: 'cascade' });
    List.hasMany(models.Comment, { foreignKey: 'list_id', allowNull: false, onDelete: 'cascade' });
    List.hasMany(models.Assign, { foreignKey: 'list_id', allowNull: false, onDelete: 'cascade' });
  };

  return List;
};
