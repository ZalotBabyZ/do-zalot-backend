module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define(
    'Project',
    {
      project_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      project_vip: {
        type: DataTypes.BOOLEAN,
      },
      vip_until: {
        type: DataTypes.DATEONLY,
      },
    },
    {
      tableName: 'projects',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: false,
    }
  );

  Project.associate = (models) => {
    Project.hasMany(models.Team, { foreignKey: 'project_id', allowNull: false, onDelete: 'cascade' });
    Project.hasMany(models.Box, { foreignKey: 'project_id', allowNull: false, onDelete: 'cascade' });
    Project.hasOne(models.Config, { foreignKey: 'project_id', allowNull: false, onDelete: 'cascade' });
  };

  return Project;
};
