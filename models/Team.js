module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define(
    'Team',
    {
      user_role: {
        type: DataTypes.ENUM(['SUPERVISOR', 'TEAM_MEMBER']),
        allowNull: false,
      },
      user_status: {
        type: DataTypes.ENUM(['FORMER_MEMBER', 'MEMBER', 'INVITED', 'REQUEST_TO_JOIN']),
        allowNull: false,
      },
      user_pin: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      order: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'teams',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );

  Team.associate = (models) => {
    Team.belongsTo(models.User, { foreignKey: 'user_id', onDelete: 'restrict' });
    Team.belongsTo(models.Project, { foreignKey: 'project_id', onDelete: 'cascade' });
  };

  return Team;
};
