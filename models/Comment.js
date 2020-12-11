module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'Comment',
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: 'comments',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );

  Comment.associate = (models) => {
    Comment.belongsTo(models.User, { foreignKey: 'user_id', allowNull: false, onDelete: 'restrict' });
    Comment.belongsTo(models.List, { foreignKey: 'list_id', allowNull: false, onDelete: 'cascade' });
  };

  return Comment;
};
