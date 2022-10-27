module.exports = (sequelize, DataTypes) => {
  const categories = sequelize.define('Category', {
    id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    } 
  },
  {
    tableName: 'categories',
    underscored: true,
    timestamps: false,
  });

  return categories;
};