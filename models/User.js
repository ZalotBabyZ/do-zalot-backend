module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      image: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      resetPasswordToken: {
        type: DataTypes.STRING,
      },
      resetPasswordTokenExp: {
        type: DataTypes.BIGINT,
      },
      gender: {
        type: DataTypes.ENUM(['MALE', 'FEMALE']),
      },
      user_color: {
        type: DataTypes.STRING,
      },
      user_vip: {
        type: DataTypes.BOOLEAN,
      },
      vip_until: {
        type: DataTypes.DATEONLY,
      },
      password_changed: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
    },
    {
      tableName: 'users',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );

  User.associate = (models) => {
    User.hasMany(models.Team, { foreignKey: 'user_id', allowNull: false, onDelete: 'restrict' });
    User.hasMany(models.Assign, { foreignKey: 'user_id', allowNull: false, onDelete: 'restrict' });
    User.hasMany(models.Comment, { foreignKey: 'user_id', allowNull: false, onDelete: 'restrict' });
    User.hasMany(models.Config, { foreignKey: 'delete_right', onDelete: 'SET NULL' });
    User.hasMany(models.Config, { foreignKey: 'edit_config_right', onDelete: 'SET NULL' });
    User.hasMany(models.Config, { foreignKey: 'edit_score_right', onDelete: 'SET NULL' });
    User.hasMany(models.Config, { foreignKey: 'edit_assign_right', onDelete: 'SET NULL' });
    User.hasMany(models.Config, { foreignKey: 'regress_right', onDelete: 'SET NULL' });
    User.hasMany(models.Config, { foreignKey: 'expel_right', onDelete: 'SET NULL' });
    User.hasMany(models.Config, { foreignKey: 'approve_by_a', onDelete: 'SET NULL' });
    User.hasMany(models.Config, { foreignKey: 'approve_by_b', onDelete: 'SET NULL' });
    User.hasMany(models.Config, { foreignKey: 'approve_by_c', onDelete: 'SET NULL' });
  };

  return User;
};
