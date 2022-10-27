module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('User', {
    id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
    },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  {
    tableName: 'users',
    underscored: true,
    timestamps: false,
  });

  users.associate = (models) => {
    users.hasMany(models.BlogPost, {
      as: 'blogPosts',
      foreignKey: 'id',
    })
  }

  return users;
};