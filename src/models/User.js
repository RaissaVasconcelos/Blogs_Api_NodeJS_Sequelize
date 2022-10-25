module.exports = (sequelize, Datatypes) => {
  const users = sequelize.define('User', {
    id: Datatypes.INTEGER,
    displayName: Datatypes.STRING,
    email: Datatypes.STRING,
    password: Datatypes.STRING,
    image: Datatypes.STRING,
  },
  {
    tableName: 'Users',
    underscored: true,
  });

  return users;
};